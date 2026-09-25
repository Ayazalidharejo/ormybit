'use client';

import { useState, useEffect, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ModelPricing {
  name: string;
  inputPerMillion: number;
  outputPerMillion: number;
}

const models: ModelPricing[] = [
  { name: 'GPT-4o', inputPerMillion: 2.5, outputPerMillion: 10 },
  { name: 'GPT-4o-mini', inputPerMillion: 0.15, outputPerMillion: 0.6 },
  { name: 'Claude 3.5 Sonnet', inputPerMillion: 3, outputPerMillion: 15 },
  { name: 'Claude 3 Haiku', inputPerMillion: 0.25, outputPerMillion: 1.25 },
];

function estimateTokens(text: string): number {
  if (!text) return 0;
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === ' ' || char === '\n' || char === '\t') {
      count++;
    } else if (!/[a-zA-Z0-9]/.test(char)) {
      count += 2;
    } else {
      count += 0.25;
    }
  }
  return Math.ceil(count);
}

export function TokenCounter() {
  const [text, setText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedText(text), 200);
    return () => clearTimeout(timer);
  }, [text]);

  const stats = useMemo(() => {
    const tokens = estimateTokens(debouncedText);
    const characters = debouncedText.length;
    const words = debouncedText.trim() ? debouncedText.trim().split(/\s+/).length : 0;
    return { tokens, characters, words };
  }, [debouncedText]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="tc-text">Enter your text</Label>
        <Textarea
          id="tc-text"
          placeholder="Paste or type your text here to count tokens..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[200px] bg-background border-subtle font-mono text-sm scrollbar-thin"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-subtle bg-background p-4">
          <div className="text-2xl font-bold text-primary">{stats.tokens.toLocaleString()}</div>
          <div className="mt-1 text-xs text-secondary-muted">Estimated tokens</div>
        </div>
        <div className="rounded-lg border border-subtle bg-background p-4">
          <div className="text-2xl font-bold text-foreground">{stats.characters.toLocaleString()}</div>
          <div className="mt-1 text-xs text-secondary-muted">Characters</div>
        </div>
        <div className="rounded-lg border border-subtle bg-background p-4">
          <div className="text-2xl font-bold text-foreground">{stats.words.toLocaleString()}</div>
          <div className="mt-1 text-xs text-secondary-muted">Words</div>
        </div>
      </div>

      {/* Cost estimates */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Approximate cost estimates</h3>
        <div className="overflow-x-auto rounded-lg border border-subtle">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-subtle bg-muted">
                <th className="px-4 py-3 text-left font-medium text-secondary-muted">Model</th>
                <th className="px-4 py-3 text-right font-medium text-secondary-muted">Input cost</th>
                <th className="px-4 py-3 text-right font-medium text-secondary-muted">Output cost</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => {
                const inputCost = (stats.tokens / 1_000_000) * model.inputPerMillion;
                const outputCost = (stats.tokens / 1_000_000) * model.outputPerMillion;
                return (
                  <tr key={model.name} className="border-b border-subtle last:border-0">
                    <td className="px-4 py-3 font-medium text-foreground">{model.name}</td>
                    <td className="px-4 py-3 text-right text-secondary-muted">
                      ${inputCost.toFixed(4)}
                    </td>
                    <td className="px-4 py-3 text-right text-secondary-muted">
                      ${outputCost.toFixed(4)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-secondary-muted">
          Costs are approximate and for reference only. Actual billing depends on the specific tokenizer used by each model. Prices reflect published rates as of late 2024.
        </p>
      </div>
    </div>
  );
}
