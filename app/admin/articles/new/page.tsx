'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save } from 'lucide-react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function NewArticle() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tagsInput, setTagsInput] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'SEO',
    tags: [] as string[],
    metaTitle: '',
    metaDescription: '',
    published: false,
  });

  const [checkingQuality, setCheckingQuality] = useState(false);
  const [qualityReport, setQualityReport] = useState<any>(null);

  const handleAddTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ((e.type === 'keydown' && (e as React.KeyboardEvent).key === 'Enter') || e.type === 'click') {
      e.preventDefault();
      if (tagsInput.trim() && formData.tags.length < 4) {
        setFormData({ ...formData, tags: [...formData.tags, tagsInput.trim()] });
        setTagsInput('');
      }
    }
  };

  const removeTag = (indexToRemove: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, index) => index !== indexToRemove)
    });
  };

  const handleCheckQuality = async () => {
    if (!formData.content) return alert('Please write some content first.');
    setCheckingQuality(true);
    try {
      const res = await fetch('/api/admin/check-quality', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: formData.content }),
      });
      const data = await res.json();
      if (data.error) alert(data.error);
      else {
        setQualityReport(data);
        setFormData(prev => ({ ...prev, qualityReport: data }));
      }
    } catch (err) {
      alert('Failed to run quality check');
    } finally {
      setCheckingQuality(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to create article');
      }
    } catch (error) {
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon" className="h-10 w-10 text-secondary-muted hover:text-foreground">
            <Link href="/admin">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Create New Article
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN: HTML EDITOR */}
        <div className="flex-1 space-y-2">
          <div className="overflow-hidden rounded-xl border border-subtle bg-white dark:bg-zinc-950 shadow-sm min-h-[800px] flex flex-col quill-wrapper">
            <ReactQuill 
              theme="snow" 
              value={formData.content} 
              onChange={(content) => setFormData({ ...formData, content })}
              className="flex-1 flex flex-col h-[750px]"
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                  ['link', 'image', 'video'],
                  ['clean']
                ],
              }}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: SETTINGS SIDEBAR */}
        <div className="w-full lg:w-[350px] space-y-6">
          <div className="rounded-xl border border-subtle bg-card p-5 shadow-sm space-y-5">
            
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g. A weekend in London"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="flex h-10 w-full rounded-md border border-subtle bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="SEO">SEO</option>
                <option value="Development">Development</option>
                <option value="AI Tools">AI Tools</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag (max 4)"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="bg-background flex-1"
                  disabled={formData.tags.length >= 4}
                />
                <Button type="button" onClick={handleAddTag} disabled={!tagsInput.trim() || formData.tags.length >= 4} variant="secondary">
                  Add
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {tag}
                      <button type="button" onClick={() => removeTag(i)} className="text-primary hover:text-primary/70">
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <span className="text-xs text-secondary-muted">{formData.tags.length}/4</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                placeholder="e.g. a-weekend-in-london"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                placeholder="Short description..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                required
                className="bg-background resize-none h-20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta title</Label>
              <Input
                id="metaTitle"
                placeholder="SEO title (optional)"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta description</Label>
              <Textarea
                id="metaDescription"
                placeholder="SEO description (optional)"
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                className="bg-background resize-none h-24"
              />
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-subtle">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="h-4 w-4 rounded border-subtle bg-card text-primary focus:ring-primary"
              />
              <Label htmlFor="published">Publish immediately</Label>
            </div>

            <div className="flex flex-col gap-2 pt-4 border-t border-subtle">
              <Button type="button" onClick={handleCheckQuality} disabled={checkingQuality} variant="secondary" className="w-full">
                {checkingQuality ? 'Analyzing...' : 'Check Content Quality & Grammar'}
              </Button>
              <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Save className="mr-2 h-4 w-4" />
                {loading ? 'Saving...' : 'Save Article'}
              </Button>
            </div>
            
          </div>

          {/* QUALITY REPORT PANEL */}
          {qualityReport && (
            <div className="rounded-xl border border-subtle bg-card p-5 shadow-sm space-y-5">
              <h3 className="font-bold text-lg text-foreground">Content Quality Report</h3>
              <p className="text-xs text-secondary-muted">This is an advisory writing assistant, NOT a scientific AI-detector.</p>
              
              {/* Grammar */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Grammar & Style</h4>
                {qualityReport.grammar?.rateLimited ? (
                  <p className="text-sm text-yellow-500">{qualityReport.grammar.message}</p>
                ) : qualityReport.grammar?.matches?.length > 0 ? (
                  <ul className="text-sm space-y-2 max-h-40 overflow-y-auto pr-2 scrollbar-thin">
                    {qualityReport.grammar.matches.map((m: any, i: number) => (
                      <li key={i} className="bg-background rounded p-2 border border-subtle">
                        <span className="text-red-400 line-through mr-2">{m.context.text.substring(m.context.offset, m.context.offset + m.context.length)}</span>
                        {m.replacements.length > 0 && <span className="text-green-400">{m.replacements[0].value}</span>}
                        <p className="text-xs text-secondary-muted mt-1">{m.message}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-green-500">No grammar issues found!</p>
                )}
              </div>

              {/* Burstiness */}
              <div className="space-y-2 pt-3 border-t border-subtle">
                <h4 className="font-semibold text-sm">Sentence Variance</h4>
                <div className="flex justify-between items-center bg-background rounded p-2 border border-subtle">
                  <span className="text-sm">Score: {qualityReport.quality.burstiness.stdDev}</span>
                  <span className={`text-xs px-2 py-1 rounded ${qualityReport.quality.burstiness.stdDev < 2.5 ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                    {qualityReport.quality.burstiness.label}
                  </span>
                </div>
              </div>

              {/* Generic Phrases */}
              <div className="space-y-2 pt-3 border-t border-subtle">
                <h4 className="font-semibold text-sm">Generic Phrases</h4>
                {qualityReport.quality.genericMatches?.length > 0 ? (
                  <ul className="text-sm space-y-1">
                    {qualityReport.quality.genericMatches.map((m: any, i: number) => (
                      <li key={i} className="text-yellow-500 bg-background rounded p-2 border border-subtle">"{m.phrase}"</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-green-500">No generic phrases detected.</p>
                )}
              </div>

              {/* Repetitions */}
              <div className="space-y-2 pt-3 border-t border-subtle">
                <h4 className="font-semibold text-sm">Repetitive Starters</h4>
                {qualityReport.quality.repetitions?.length > 0 ? (
                  <ul className="text-sm space-y-1">
                    {qualityReport.quality.repetitions.map((r: any, i: number) => (
                      <li key={i} className="text-yellow-500 bg-background rounded p-2 border border-subtle">
                        "{r.phrase}" ({r.count} times)
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-green-500">Good sentence variety.</p>
                )}
              </div>
            </div>
          )}
        </div>

      </form>
    </div>
  );
}
