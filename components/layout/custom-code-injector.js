"use client";

import { useEffect } from "react";

const ELEMENT_NODE = 1;
const TEXT_NODE = 3;

function buildInjectableNode(node) {
  if (node.nodeType !== ELEMENT_NODE) {
    return node.cloneNode(true);
  }

  const element = node;

  if (element.tagName.toLowerCase() !== "script") {
    return element.cloneNode(true);
  }

  const script = document.createElement("script");

  for (const attribute of Array.from(element.attributes)) {
    script.setAttribute(attribute.name, attribute.value);
  }

  script.text = element.textContent ?? "";
  return script;
}

function injectSnippet({ code, target, place = "end" }) {
  if (!code || !code.trim()) {
    return [];
  }

  const template = document.createElement("template");
  template.innerHTML = code;

  const nodes = Array.from(template.content.childNodes);
  const insertedNodes = [];
  const anchor = place === "start" ? target.firstChild : null;

  for (const node of nodes) {
    if (node.nodeType === TEXT_NODE && !node.textContent?.trim()) {
      continue;
    }

    const injectableNode = buildInjectableNode(node);

    if (anchor) {
      target.insertBefore(injectableNode, anchor);
    } else {
      target.appendChild(injectableNode);
    }

    insertedNodes.push(injectableNode);
  }

  return insertedNodes;
}

export default function CustomCodeInjector({ headCode = "", bodyCode = "" }) {
  useEffect(() => {
    const insertedHeadNodes = injectSnippet({
      code: headCode,
      target: document.head,
      place: "end",
    });

    const insertedBodyNodes = injectSnippet({
      code: bodyCode,
      target: document.body,
      place: "start",
    });

    return () => {
      for (const node of [...insertedHeadNodes, ...insertedBodyNodes]) {
        node.remove();
      }
    };
  }, [headCode, bodyCode]);

  return null;
}
