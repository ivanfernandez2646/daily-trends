import * as cheerio from 'cheerio';
import Feed from '../../domain/Feed';
import FeedId from '../../domain/FeedId';
import FeedAuthor from '../../domain/FeedAuthor';
import FeedDescription from '../../domain/FeedDescription';
import FeedSource from '../../domain/FeedSource';
import FeedTitle from '../../domain/FeedTitle';

type HTMLMapping = {
  authorHTML: string;
  titleHTML: string;
  descriptionHTML: string;
  decodeChars?: boolean;
};

export default abstract class FeedScraperBase {
  async getScrapedResults(url: string, source: FeedSource, mapping: HTMLMapping): Promise<Feed[]> {
    const response = await fetch(url, {
        headers: { 'Content-Type': 'text/html; charset=UTF-8' }
      }),
      body = await this.getTransformedBody(response, mapping),
      $ = cheerio.load(body),
      feeds: Feed[] = [];

    for (const element of $('article')) {
      const txtAuthor = $(element).find(mapping.authorHTML)?.text()?.trim(),
        txtTitle = $(element).find(mapping.titleHTML)?.text()?.trim(),
        txtDescription = $(element).find(mapping.descriptionHTML)?.text()?.trim();

      if (!txtAuthor || !txtTitle) {
        continue;
      }

      feeds.push(
        Feed.create({
          id: FeedId.random(),
          title: new FeedTitle(txtTitle),
          description: new FeedDescription(txtDescription ?? null),
          author: new FeedAuthor(txtAuthor),
          source
        })
      );

      if (feeds.length >= 5) {
        break;
      }
    }

    return feeds;
  }

  private async getTransformedBody(response: Response, mapping: HTMLMapping): Promise<string> {
    if (!mapping.decodeChars) {
      return response.text();
    }

    const bodyArrayBuffer = await response.arrayBuffer();
    return (() => {
      const decoder = new TextDecoder('iso-8859-1');
      return decoder.decode(bodyArrayBuffer);
    })();
  }
}
