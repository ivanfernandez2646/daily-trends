import puppeteer from 'puppeteer';
import configConvict from '../../../../../apps/cms/backend/config/config';

export default abstract class FeedScraperBase {
  async getScrapedResults(url: string): Promise<string> {
    const env = configConvict.get('env'),
      browser = await puppeteer.launch({
        headless: env === 'production' ? true : 'new',
        args: ['--disable-setuid-sandbox', '--no-sandbox', '--single-process', '--no-zygote'],
        executablePath: env === 'production' ? configConvict.get('puppeteerExecutablePath') : puppeteer.executablePath()
      }),
      page = await browser.newPage(),
      response = await page.goto(url, { timeout: 0 }),
      body = await response!.text();

    await browser.close();

    return body;
  }
}
