import puppeteer from 'puppeteer';
import Feed from '../../domain/Feed';
import { FeedScrap } from '../../domain/FeedScrap';
import jsdom from 'jsdom';
import FeedId from '../../domain/FeedId';
import FeedTitle from '../../domain/FeedTitle';
import FeedAuthor from '../../domain/FeedAuthor';
import FeedDescription from '../../domain/FeedDescription';

export default class ElMundoFeedScraper implements FeedScrap {
  async scrap(): Promise<Feed[]> {
    try {
      const browser = await puppeteer.launch({ headless: 'new' }),
        page = await browser.newPage(),
        response = await page.goto('https://elmundo.es/'),
        body = await response!.text();

      await browser.close();

      const {
        window: { document }
      } = new jsdom.JSDOM(body);

      const feeds: Feed[] = [];

      for (const element of document.querySelectorAll('article')) {
        const txtAuthor = element.querySelector('.ue-c-cover-content__byline-name')?.textContent?.trim(),
          txtTitle = element.querySelector('.ue-c-cover-content__headline')?.textContent?.trim(),
          txtDescription = element.querySelector('.ue-c-cover-content__kicker')?.textContent?.trim();

        if (!txtAuthor || !txtTitle) {
          continue;
        }

        feeds.push(
          Feed.create({
            id: FeedId.random(),
            title: new FeedTitle(txtTitle),
            description: new FeedDescription(txtDescription ?? null),
            author: new FeedAuthor(txtAuthor)
          })
        );

        if (feeds.length >= 5) {
          break;
        }
      }

      return feeds;
    } catch (e) {
      throw e;
    }
  }
}