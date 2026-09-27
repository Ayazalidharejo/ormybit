'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Copy, CheckCircle2, Sparkles, Plus, Trash2, Tag, BookOpen, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

interface BriefData {
  suggestedTitle: string;
  outline: { heading: string; notes: string }[];
  questionsToAnswer: string[];
  targetWordCount: string;
  relatedEntities: string[];
}

export function AIContentBriefGenerator() {
  const [keyword, setKeyword] = useState('');
  const [competitors, setCompetitors] = useState<string[]>(['']);
  const [isLoading, setIsLoading] = useState(false);
  const [brief, setBrief] = useState<BriefData | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAddCompetitor = () => {
    if (competitors.length < 3) {
      setCompetitors([...competitors, '']);
    }
  };

  const handleRemoveCompetitor = (index: number) => {
    const newCompetitors = [...competitors];
    newCompetitors.splice(index, 1);
    if (newCompetitors.length === 0) {
      newCompetitors.push('');
    }
    setCompetitors(newCompetitors);
  };

  const handleCompetitorChange = (index: number, value: string) => {
    const newCompetitors = [...competitors];
    newCompetitors[index] = value;
    setCompetitors(newCompetitors);
  };

  const generateBrief = async () => {
    if (!keyword.trim()) {
      toast.error('Please enter a target keyword');
      return;
    }

    const validCompetitors = competitors.filter(c => c.trim().startsWith('http'));

    setIsLoading(true);
    setBrief(null);

    try {
      const response = await fetch('/api/content-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword, competitors: validCompetitors }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate brief');
      }

      setBrief(data);
      toast.success('Content brief generated successfully!');
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!brief) return;

    let markdown = `# Content Brief: ${keyword}\n\n`;
    markdown += `**Target Word Count:** ${brief.targetWordCount}\n\n`;
    markdown += `## Suggested Title\n${brief.suggestedTitle}\n\n`;
    
    markdown += `## Outline\n`;
    brief.outline.forEach((item) => {
      markdown += `### ${item.heading}\n_${item.notes}_\n\n`;
    });

    markdown += `## Questions to Answer\n`;
    brief.questionsToAnswer.forEach((q) => {
      markdown += `- ${q}\n`;
    });

    markdown += `\n## Related Keywords / Entities\n`;
    markdown += brief.relatedEntities.join(', ') + '\n';

    navigator.clipboard.writeText(markdown);
    setCopied(true);
    toast.success('Brief copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="keyword">Target Keyword</Label>
            <Input
              id="keyword"
              placeholder="e.g. best coffee maker for small kitchen"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Competitor URLs (Optional, Max 3)</Label>
            </div>
            
            {competitors.map((url, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="https://example.com/article"
                  value={url}
                  onChange={(e) => handleCompetitorChange(index, e.target.value)}
                />
                {competitors.length > 1 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveCompetitor(index)}
                    className="shrink-0"
                  >
                    <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                )}
              </div>
            ))}
            
            {competitors.length < 3 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddCompetitor}
                className="text-muted-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Competitor URL
              </Button>
            )}
          </div>

          <Button 
            className="w-full" 
            size="lg" 
            onClick={generateBrief}
            disabled={isLoading || !keyword.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing and Generating Brief...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Content Brief
              </>
            )}
          </Button>
        </div>
      </Card>

      {brief && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Your Content Brief</h2>
            <Button variant="outline" onClick={copyToClipboard}>
              {copied ? (
                <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              {copied ? 'Copied' : 'Copy Markdown'}
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              <Card className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <BookOpen className="w-5 h-5" />
                  <h3>Suggested Title</h3>
                </div>
                <h1 className="text-xl md:text-2xl font-bold">{brief.suggestedTitle}</h1>
              </Card>

              <Card className="p-6 space-y-6">
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <Sparkles className="w-5 h-5" />
                  <h3>Content Outline</h3>
                </div>
                <div className="space-y-6">
                  {brief.outline.map((item, i) => (
                    <div key={i} className="space-y-2 border-l-2 border-primary/20 pl-4">
                      <h4 className="text-lg font-semibold">{item.heading}</h4>
                      <p className="text-muted-foreground">{item.notes}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <Tag className="w-5 h-5" />
                  <h3>Details</h3>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Target Word Count</p>
                  <p className="font-semibold">{brief.targetWordCount}</p>
                </div>
                <div className="space-y-2 pt-2">
                  <p className="text-sm font-medium text-muted-foreground">Semantic Entities</p>
                  <div className="flex flex-wrap gap-2">
                    {brief.relatedEntities.map((entity, i) => (
                      <span key={i} className="px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-md">
                        {entity}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <HelpCircle className="w-5 h-5" />
                  <h3>Questions to Answer</h3>
                </div>
                <ul className="space-y-3">
                  {brief.questionsToAnswer.map((q, i) => (
                    <li key={i} className="flex gap-2 items-start text-sm">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
