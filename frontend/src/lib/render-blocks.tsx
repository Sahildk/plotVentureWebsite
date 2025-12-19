import React from "react";

/**
 * Render Strapi blocks content
 * Handles both string (richtext) and blocks array formats
 */
export function renderContent(content: string | any): string {
  if (!content) return "";

  // If it's already a string (richtext HTML), return it
  if (typeof content === "string") {
    return content;
  }

  // If it's a blocks array, convert to HTML
  if (Array.isArray(content)) {
    return content
      .map((block) => {
        switch (block.type) {
          case "paragraph":
            return `<p>${block.children?.map((child: any) => child.text || "").join("") || ""}</p>`;
          case "heading":
            const level = block.level || 2;
            const text = block.children?.map((child: any) => child.text || "").join("") || "";
            return `<h${level}>${text}</h${level}>`;
          case "list":
            const listType = block.format === "ordered" ? "ol" : "ul";
            const items = block.children?.map((item: any) => {
              const itemText = item.children?.map((child: any) => child.text || "").join("") || "";
              return `<li>${itemText}</li>`;
            }).join("") || "";
            return `<${listType}>${items}</${listType}>`;
          case "quote":
            const quoteText = block.children?.map((child: any) => child.text || "").join("") || "";
            return `<blockquote>${quoteText}</blockquote>`;
          case "code":
            const codeText = block.children?.map((child: any) => child.text || "").join("") || "";
            return `<pre><code>${codeText}</code></pre>`;
          default:
            return "";
        }
      })
      .join("");
  }

  return "";
}


