type ASTNode = {
  type?: string;
  tagName?: string;
  properties?: Record<string, any>;
  children?: ASTNode[];
};

function walkTree(node: ASTNode) {
  if (!node || typeof node !== 'object') return;

  if (node.type === 'element') {
    // 适配 a 标签，优化外部链接在新标签页打开，并且添加防盗链和安全属性
    if (node.tagName === 'a') {
      node.properties = node.properties || {};
      const href = node.properties.href;
      if (typeof href === 'string' && (href.startsWith('http://') || href.startsWith('https://'))) {
        node.properties.target = '_blank';
        node.properties.rel = 'noopener noreferrer';
      }
    }

    // 适配 img 标签，添加防盗链（referrerPolicy）以及性能优化（lazy loading & async decoding）
    if (node.tagName === 'img') {
      node.properties = node.properties || {};
      node.properties.referrerPolicy = 'no-referrer';
      node.properties.loading = 'lazy';
      node.properties.decoding = 'async';
    }
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      walkTree(child);
    }
  }
}

export function rehypeOptimization() {
  return (tree: ASTNode) => {
    walkTree(tree);
  };
}
