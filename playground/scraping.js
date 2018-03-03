const puppeteer = require('puppeteer');
const config = require('./../server/config/config');
const {Movie} = require('./../server/models/movie');

// async each
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
}
 
// 取得するもの =>　url, タグ
// 個別ページへのリンク取得メソッド
async function getIndivisualPageUrl (page) {
  return await page.$$eval('.article_content h3 a', elements => {
    return elements.map(ele => ele.href);
  });
}

//個別ページから埋め込みのurlを取得
async function getMovieUrl (page) {
  return await page.$eval('.bx-viewport iframe', ele => ele.src);
}

// 個別ページからタイトル取得
async function getTitle (page) {
  return await page.$eval('#main_video article header h1', ele => ele.innerText);
}

// 個別ページからタグを取得
async function getTags (page) {
  return await page.$$eval('#main_video article header ul li a', elements => {
    return elements.map((ele) => ele.innerText);
  });
}

puppeteer.launch().then(async browser => {
    // 変数宣言
  const moviesInfo =[]; //movieテーブルのインデックス
  let info = {}; //movieテーブル
  var indivisualUrl;
  let indivisualUrls = [];

  const page = await browser.newPage();
  let pageUrl = config.url.PY;

  try {

    // 個別ページのurl取得
    for (i=1; i<4; i++) {
        pageUrl =  i === 1 ? config.url.PY :`${config.url.PY}/?p=${i}`;
        await page.goto(pageUrl);
        indivisualUrl = await getIndivisualPageUrl(page);
        indivisualUrls.push(...indivisualUrl);  
    }

　  // 個別ページから各情報を取得
    await asyncForEach(indivisualUrls, async (url) => {
      await page.goto(url);
      // データベースに保存
      var movie = new Movie({
          url: await getMovieUrl(page),
          title: await getTitle(page),
          tags: await getTags(page)
      })
      movie.save();
    });
  } catch(e) {
    await browser.close();
  }
  await browser.close();
});
