import fs from "fs";
import path from "path";
import { site } from "@/data/site";
import { getAllPosts } from "./content";

export function generateRssFeed() {
  const posts = getAllPosts();
  const siteUrl = site.url.replace(/\/$/, "");

  const itemsXml = posts
    .map((post) => {
      const postUrl = `${siteUrl}/posts/${post.slug}/`;
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.description || post.title}]]></description>
      <pubDate>${new Date(post.pubDate).toUTCString()}</pubDate>
      <category><![CDATA[${post.category}]]></category>
    </item>`;
    })
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2000/svg">
  <channel>
    <title><![CDATA[${site.title}]]></title>
    <description><![CDATA[${site.description}]]></description>
    <link>${siteUrl}</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${itemsXml}
  </channel>
</rss>`;

  try {
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    fs.writeFileSync(path.join(publicDir, "rss.xml"), rssXml, "utf8");
  } catch (err) {
    console.error("生成 rss.xml 失败", err);
  }
}
