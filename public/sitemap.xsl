<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | Sai Enterprises Electrical Distribution</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
            background-color: #0b1120;
            color: #f1f5f9;
            margin: 0;
            padding: 30px 20px;
          }
          .container {
            max-width: 1000px;
            margin: 0 auto;
          }
          .header {
            padding-bottom: 24px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 24px;
          }
          h1 {
            font-size: 24px;
            font-weight: 800;
            color: #ffffff;
            margin: 0 0 8px 0;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .badge {
            background: rgba(0, 229, 255, 0.15);
            color: #00e5ff;
            border: 1px solid rgba(0, 229, 255, 0.3);
            font-size: 12px;
            padding: 2px 10px;
            border-radius: 9999px;
            font-weight: 600;
          }
          p.desc {
            color: #94a3b8;
            font-size: 14px;
            margin: 0;
          }
          .count-box {
            background: #1e293b;
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 13px;
            color: #cbd5e1;
            margin-bottom: 20px;
            display: inline-block;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: #131d31;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            overflow: hidden;
          }
          th {
            background: #1e293b;
            color: #00e5ff;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            text-align: left;
            padding: 14px 16px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          td {
            padding: 12px 16px;
            font-size: 13px;
            color: #e2e8f0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }
          tr:hover td {
            background: rgba(0, 229, 255, 0.05);
          }
          a {
            color: #38bdf8;
            text-decoration: none;
            word-break: break-all;
          }
          a:hover {
            color: #00e5ff;
            text-decoration: underline;
          }
          .priority-tag {
            font-weight: 700;
            color: #10b981;
            font-family: monospace;
          }
          .freq-tag {
            color: #94a3b8;
            font-size: 12px;
            text-transform: capitalize;
          }
          .date-tag {
            color: #cbd5e1;
            font-family: monospace;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Sai Enterprises <span class="badge">XML Sitemap</span></h1>
            <p class="desc">This is an XML Sitemap intended for consumption by search engines like Google, Bing, and Yahoo.</p>
          </div>
          
          <div class="count-box">
            Total indexed URLs in this sitemap: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong>
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>URL Location</th>
                <th>Priority</th>
                <th>Change Frequency</th>
                <th>Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td style="color: #64748b; width: 40px;"><xsl:value-of select="position()"/></td>
                  <td>
                    <xsl:variable name="itemURL">
                      <xsl:value-of select="sitemap:loc"/>
                    </xsl:variable>
                    <a href="{$itemURL}" target="_blank">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td>
                    <span class="priority-tag"><xsl:value-of select="sitemap:priority"/></span>
                  </td>
                  <td>
                    <span class="freq-tag"><xsl:value-of select="sitemap:changefreq"/></span>
                  </td>
                  <td>
                    <span class="date-tag"><xsl:value-of select="sitemap:lastmod"/></span>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
