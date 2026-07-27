import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { getAllMoments, getMomentBySlug } from "@/lib/content";
import { Icon } from "@/components/Icon";

interface MomentDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const moments = getAllMoments();
  return moments.map((m) => ({ slug: m.slug }));
}

export default async function MomentDetailPage({ params }: MomentDetailPageProps) {
  const { slug } = await params;
  const moment = getMomentBySlug(slug);

  if (!moment) {
    notFound();
  }

  return (
    <div className="fly-moment-detail max-w-2xl mx-auto space-y-6">
      <Link
        href="/moments/"
        className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--muted)] hover:text-[var(--text)] transition-colors"
      >
        <Icon name="arrow-left" size={16} />
        <span>返回瞬间列表</span>
      </Link>

      <div className="p-8 rounded-3xl bg-[var(--page-alt)] border border-[var(--line)] space-y-6 shadow-lg">
        <p className="text-base sm:text-lg text-[var(--text)] whitespace-pre-wrap leading-relaxed">
          {moment.content}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-[var(--line)] text-xs text-[var(--mute)]">
          <time dateTime={moment.date}>
            {format(new Date(moment.date), "yyyy年MM月dd日 HH:mm", { locale: zhCN })}
          </time>
          {moment.tags.length > 0 && (
            <div className="flex gap-1.5">
              {moment.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-[var(--page)] text-[var(--muted)]">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
