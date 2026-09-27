import mongoose from 'mongoose';

export interface IArticle extends mongoose.Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category?: string;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  coverImage?: string;
  author: string;
  published: boolean;
  qualityReport?: any;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new mongoose.Schema<IArticle>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    category: { type: String },
    tags: [{ type: String }],
    metaTitle: { type: String },
    metaDescription: { type: String },
    coverImage: { type: String },
    author: { type: String, default: 'Admin' },
    published: { type: Boolean, default: false },
    qualityReport: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);
