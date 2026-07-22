"use client";

import { colors } from "@/lib/theme";

import Link from "next/link";
import { Trophy, Star, ThumbsUp, ArrowRight, Crown, BookOpen, PenLine, Archive } from "lucide-react";
import { useMemo } from "react";
import { articles, type Article } from "@/data/articles";
import { useVotes } from "@/context/VoteContext";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { usePublishedArticles } from "@/hooks/usePublishedArticles";

function WriterOfMonth() {
  const { votes } = useVotes();
  const { config } = useSiteConfig();
  const { allPublished } = usePublishedArticles();

  if (!config.womVisible) return null;

  const voteCount = allPublished
    .filter((a) => a.author === config.womName)
    .reduce((sum, a) => sum + (votes[a.id] ?? (a as any).votes ?? 0), 0);
  const article = allPublished.find((a) => a.id === config.womArticleId);

  return (
    <div
      className="rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6"
      style={{ backgroundColor: colors.green900 }}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 text-2xl"
        style={{ backgroundColor: colors.green800, border: `3px solid ${colors.green400}` }}
      >
        <Crown size={28} style={{ color: colors.green400 }} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Trophy size={14} style={{ color: colors.yellow400 }} />
          <span style={{ color: colors.yellow400, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Writer of the Month — {config.themeMonth}
          </span>
        </div>
        <h2 style={{ color: colors.white, fontWeight: 700, fontSize: "1.3rem", marginBottom: "0.25rem" }}>
          {config.womName}
        </h2>
        <p style={{ color: colors.green300, fontSize: "0.8rem", marginBottom: "0.75rem" }}>
          {config.womGrade}
        </p>
        <p style={{ color: colors.green200, fontSize: "0.875rem", lineHeight: "1.6", marginBottom: "1rem" }}>
          {config.womBio}
        </p>
        {article && (
          <Link
            href={`/article/${config.womArticleId}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: colors.green600, color: colors.white }}
          >
            Read their work <ArrowRight size={14} />
          </Link>
        )}
      </div>
      <div className="text-center shrink-0">
        <div style={{ color: colors.green400, fontWeight: 700, fontSize: "2rem" }}>{voteCount}</div>
        <div style={{ color: colors.green300, fontSize: "0.7rem" }}>votes</div>
      </div>
    </div>
  );
}

function ThemeBanner() {
  const { config } = useSiteConfig();
  
  if (!config.themeVisible) return null;

  return (
    <div
      className="rounded-2xl border p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5"
      style={{ backgroundColor: colors.yellow50, borderColor: colors.amber200 }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: colors.yellow100, border: `2px solid ${colors.yellow400}` }}
      >
        <PenLine size={20} style={{ color: colors.amber600 }} />
      </div>
      <div className="flex-1">
        <p style={{ color: colors.amber800, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.25rem" }}>
          {config.themeMonth} Theme
        </p>
        <h3 style={{ color: colors.amber900, fontWeight: 700, fontSize: "1.4rem", marginBottom: "0.4rem" }}>
          {config.themeName}
        </h3>
        <p style={{ color: colors.amber800, fontSize: "0.85rem", lineHeight: "1.6" }}>
          {config.themeDescription}
        </p>
      </div>
      <Link
        href="/submit"
        className="shrink-0 px-5 py-2 rounded-full text-sm hover:opacity-90 transition-opacity"
        style={{ backgroundColor: colors.amber600, color: colors.white }}
      >
        Submit Now
      </Link>
    </div>
  );
}

function EditorChoiceCard({ piece }: { piece: (typeof articles)[0] }) {
  const { votes, voted, castVote } = useVotes();
  const voteCount = votes[piece.id] ?? piece.votes;

  return (
    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: colors.green200 }}>
      <div className="px-6 py-2 flex items-center gap-2" style={{ backgroundColor: colors.green100 }}>
        <Star size={14} style={{ color: colors.green700 }} fill={colors.green700} />
        <span style={{ color: colors.green700, fontSize: "0.75rem", fontWeight: 500 }}>Featured Pick</span>
      </div>
      <div className="p-7 bg-white">
        <span
          className="inline-block px-3 py-0.5 rounded-full text-xs mb-3"
          style={{ backgroundColor: colors.green50, color: colors.green600, border: `1px solid ${colors.green200}` }}
        >
          {piece.category}
        </span>
        <Link href={`/article/${piece.id}`}>
          <h2
            style={{ color: colors.green900, fontWeight: 700, fontSize: "1.6rem", lineHeight: "1.3", marginBottom: "0.75rem" }}
            className="hover:underline cursor-pointer"
          >
            {piece.title}
          </h2>
        </Link>
        <p style={{ color: colors.gray500, lineHeight: "1.8", marginBottom: "1.25rem", fontSize: "0.95rem" }}>
          {piece.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <div style={{ color: colors.green900, fontWeight: 500, fontSize: "0.875rem" }}>{piece.author}</div>
            <div style={{ color: colors.gray400, fontSize: "0.75rem" }}>{piece.grade}</div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => castVote(piece.id)}
              disabled={voted[piece.id]}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition-all"
              style={{
                backgroundColor: voted[piece.id] ? colors.green900 : colors.green50,
                color: voted[piece.id] ? colors.white : colors.green700,
                border: `1px solid ${colors.green200}`,
                cursor: voted[piece.id] ? "default" : "pointer",
              }}
            >
              <ThumbsUp size={14} />
              {voteCount}
            </button>
            <Link
              href={`/article/${piece.id}`}
              className="flex items-center gap-1 text-sm hover:underline"
              style={{ color: colors.green600 }}
            >
              Read <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditorChoice() {
  const { config } = useSiteConfig();
  const { allPublished } = usePublishedArticles();

  if (!config.editorChoiceVisible) return null;

  const ids = config.editorChoiceIds?.length
    ? config.editorChoiceIds
    : articles.filter((a) => a.isEditorChoice).map((a) => a.id);

  const pieces = ids
    .map((id) => allPublished.find((a) => a.id === id))
    .filter((a): a is (typeof articles)[0] => Boolean(a));

  if (pieces.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Star size={16} style={{ color: colors.green600 }} />
        <span style={{ color: colors.green600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Editor&apos;s Choice — {config.themeMonth}
        </span>
      </div>
      <div className="flex flex-col gap-6">
        {pieces.map((piece) => (
          <EditorChoiceCard key={piece.id} piece={piece} />
        ))}
      </div>
    </div>
  );
}

function SideLeaderboard() {
  const { config } = useSiteConfig();
  const { votes } = useVotes();
  const { allPublished } = usePublishedArticles();

  // Build the ranking purely from published articles — no seeded leaderboard data.
  const ranked = useMemo(() => {
    const authorMap = new Map<string, { name: string; grade: string; totalVotes: number; pieces: number }>();
    for (const a of allPublished) {
      const key = a.author;
      const voteCount = votes[a.id] ?? a.votes;
      if (authorMap.has(key)) {
        const entry = authorMap.get(key)!;
        entry.totalVotes += voteCount;
        entry.pieces += 1;
      } else {
        authorMap.set(key, { name: a.author, grade: a.grade, totalVotes: voteCount, pieces: 1 });
      }
    }
    return [...authorMap.values()]
      .sort((a, b) => b.totalVotes - a.totalVotes)
      .slice(0, 5)
      .map((w, i) => ({ ...w, rank: i + 1 }));
  }, [allPublished, votes]);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: colors.green200 }}>
        <div className="px-5 py-3.5" style={{ backgroundColor: colors.green900 }}>
          <div className="flex items-center gap-2">
            <Trophy size={16} style={{ color: colors.yellow400 }} />
            <span style={{ color: colors.white, fontWeight: 600, fontSize: "0.875rem" }}>Top Writers</span>
          </div>
          <p style={{ color: colors.green300, fontSize: "0.7rem", marginTop: "0.1rem" }}>
            People&apos;s Choice — {config.themeMonth}
          </p>
        </div>
        <div className="bg-white divide-y" style={{ borderColor: colors.gray100 }}>
          {ranked.map((writer, i) => (
            <div key={writer.name} className="px-5 py-3.5 flex items-center gap-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                style={{ backgroundColor: i === 0 ? colors.yellow100 : colors.gray100, color: i === 0 ? colors.amber600 : colors.gray500 }}
              >
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ color: colors.green900, fontWeight: 500, fontSize: "0.8rem" }} className="truncate">
                  {writer.name}
                </div>
                <div style={{ color: colors.gray400, fontSize: "0.7rem" }}>{writer.grade}</div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <ThumbsUp size={11} style={{ color: colors.green600 }} />
                <span style={{ color: colors.green700, fontSize: "0.8rem", fontWeight: 600 }}>{writer.totalVotes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border p-5 flex flex-col gap-3" style={{ borderColor: colors.gray200, backgroundColor: colors.white }}>
        <p style={{ color: colors.gray500, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Quick Links
        </p>
        <Link
          href="/hub"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors"
          style={{ border: `1px solid ${colors.gray200}` }}
        >
          <BookOpen size={16} style={{ color: colors.green600 }} />
          <span style={{ color: colors.green900, fontSize: "0.85rem", fontWeight: 500 }}>Browse All Pieces</span>
        </Link>
        <Link
          href="/archive"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors"
          style={{ border: `1px solid ${colors.gray200}` }}
        >
          <Archive size={16} style={{ color: colors.green600 }} />
          <span style={{ color: colors.green900, fontSize: "0.85rem", fontWeight: 500 }}>The Archive</span>
        </Link>
      </div>
    </div>
  );
}

function RecentCard({ article }: { article: (typeof articles)[0] }) {
  const { votes, voted, castVote } = useVotes();
  const voteCount = votes[article.id] ?? article.votes;

  return (
    <div className="rounded-2xl border bg-white flex flex-col hover:shadow-md transition-shadow" style={{ borderColor: colors.gray200 }}>
      <div className="p-5 flex flex-col flex-1">
        <span
          className="inline-block px-2.5 py-0.5 rounded-full text-xs mb-3 self-start"
          style={{ backgroundColor: colors.green50, color: colors.green600, border: `1px solid ${colors.green200}` }}
        >
          {article.category}
        </span>
        <Link href={`/article/${article.id}`}>
          <h3
            style={{ color: colors.green900, fontWeight: 600, fontSize: "1rem", lineHeight: "1.4", marginBottom: "0.5rem" }}
            className="hover:underline cursor-pointer"
          >
            {article.title}
          </h3>
        </Link>
        <p style={{ color: colors.gray500, fontSize: "0.8rem", lineHeight: "1.7", flex: 1 }}>{article.excerpt}</p>
      </div>
      <div className="px-5 py-3 flex items-center justify-between border-t" style={{ borderColor: colors.gray100 }}>
        <div>
          <div style={{ color: colors.gray700, fontSize: "0.8rem", fontWeight: 500 }}>{article.author}</div>
          <div style={{ color: colors.gray400, fontSize: "0.7rem" }}>
            {article.date
              ? new Date(article.date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
              : article.month}
          </div>
        </div>
        <button
          onClick={() => castVote(article.id)}
          disabled={voted[article.id]}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all"
          style={{
            backgroundColor: voted[article.id] ? colors.green900 : colors.green50,
            color: voted[article.id] ? colors.white : colors.green700,
            border: `1px solid ${colors.green200}`,
            cursor: voted[article.id] ? "default" : "pointer",
          }}
        >
          <ThumbsUp size={12} />
          {voteCount}
        </button>
      </div>
    </div>
  );
}

function RecentPieces() {
  const { allPublished } = usePublishedArticles();

  const recent = useMemo(
    () =>
      [...allPublished]
        .filter((a) => !a.isEditorChoice)
        .sort((a, b) => {
          const da = a.date ?? "0000-00-00";
          const db = b.date ?? "0000-00-00";
          return db.localeCompare(da);
        })
        .slice(0, 4),
    [allPublished],
  );

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {recent.map((article) => (
        <RecentCard key={article.id} article={article as Article} />
      ))}
    </div>
  );
}

export function Home() {
  return (
    <div className="max-w-7xl mx-auto px-5 pt-24 pb-16">
      <div className="mb-6">
        <WriterOfMonth />
      </div>

      <div className="mb-6">
        <ThemeBanner />
      </div>

      <div className="flex gap-8">
        <div className="flex-1 min-w-0">
          <EditorChoice />

          <div className="mt-8 pt-6 border-t" style={{ borderColor: colors.gray200 }}>
            <div className="flex items-center justify-between mb-5">
              <p style={{ color: colors.green900, fontWeight: 600, fontSize: "0.95rem" }}>Recent Pieces</p>
              <Link
                href="/hub"
                className="flex items-center gap-1 text-sm hover:underline"
                style={{ color: colors.green600 }}
              >
                Browse all <ArrowRight size={14} />
              </Link>
            </div>
            <RecentPieces />
          </div>
        </div>

        <div className="hidden lg:block w-64 shrink-0">
          <SideLeaderboard />
        </div>
      </div>
    </div>
  );
}
