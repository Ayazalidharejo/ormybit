'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, LogOut, FileText } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminDashboard() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/admin/articles');
      if (res.ok) {
        const data = await res.json();
        setArticles(data.articles);
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    
    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setArticles(articles.filter(a => a._id !== id));
      } else {
        alert('Failed to delete article');
      }
    } catch (error) {
      alert('Error deleting article');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-secondary-muted">
            Manage your blog articles and content.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/admin/articles/new">
              <Plus className="mr-2 h-4 w-4" />
              New Article
            </Link>
          </Button>
          <Button variant="outline" onClick={handleLogout} className="border-subtle hover:bg-muted text-secondary-muted hover:text-foreground">
            <LogOut className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-subtle bg-card shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-secondary-muted">Loading articles...</div>
        ) : articles.length === 0 ? (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-foreground">No articles yet</h3>
            <p className="mt-1 text-sm text-secondary-muted">Get started by creating your first article.</p>
            <Button asChild className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/admin/articles/new">Create Article</Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-subtle bg-muted/50 text-secondary-muted">
                <tr>
                  <th className="px-6 py-4 font-medium">Title</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-subtle">
                {articles.map((article) => (
                  <tr key={article._id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">{article.title}</div>
                      <div className="text-xs text-secondary-muted">/{article.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${article.published ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                        {article.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-secondary-muted">
                      {format(new Date(article.createdAt), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-secondary-muted hover:text-foreground">
                          <Link href={`/admin/articles/${article._id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(article._id)} className="h-8 w-8 text-secondary-muted hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
