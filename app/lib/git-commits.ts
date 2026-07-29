import { execSync } from "child_process";
import type { GitCommit } from "./types";

/**
 * 从当前项目的 git 仓库中提取最近的提交日志记录
 */
export function getGitCommits(maxCount: number = 40): GitCommit[] {
  try {
    // 使用自定义分隔符 %x1f 和 %x1e
    const format = "%H%x1f%h%x1f%an%x1f%ad%x1f%s%x1f%b%x1e";
    const cmd = `git log -n ${maxCount} --date=iso-strict --pretty=format:"${format}"`;
    const stdout = execSync(cmd, { encoding: "utf8", timeout: 3000 });

    const rawCommits = stdout.split("\x1e").filter((entry) => entry.trim().length > 0);

    return rawCommits.map((raw) => {
      const [hash = "", abbrevHash = "", author = "", date = "", subject = "", body = ""] = raw
        .split("\x1f")
        .map((s) => s.trim());

      // 解析 Conventional Commits 类型 (e.g., feat, fix, refactor, style, docs)
      let type = "chore";
      const match = subject.match(/^([a-zA-Z]+)(?:\([^\)]+\))?:/);
      if (match) {
        type = match[1].toLowerCase();
      }

      return {
        hash,
        abbrevHash,
        author,
        date: date || new Date().toISOString(),
        subject,
        body,
        type,
      };
    });
  } catch (error) {
    // 静态部署/构建fallback
    return [
      {
        hash: "8f7e6d5c4b3a2109",
        abbrevHash: "8f7e6d5",
        author: "Kerntau",
        date: new Date().toISOString(),
        subject: "feat(moments): 引入 Git Commit 提交记录与日志流水线",
        body: "全局集成 GSAP 动画与 Git 日志面板表现层",
        type: "feat",
      },
    ];
  }
}
