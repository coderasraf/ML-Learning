import { useState } from 'react';
import { ResourceItem } from '../types';
import { STATIC_RESOURCES } from '../data/staticCurriculum';
import { BookOpen, Search, ExternalLink, Tag, Briefcase, PlayCircle, Layers, Globe, Filter } from 'lucide-react';

export default function ResourcesLibrary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Books' | 'Courses' | 'Articles' | 'Papers' | 'Videos' | 'Tools' | 'Frameworks'>('all');

  const filteredResources = STATIC_RESOURCES.filter(res => {
    const matchesSearch = 
      res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || res.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Books': return <BookOpen className="w-5 h-5 text-amber-500" />;
      case 'Courses': return <Layers className="w-5 h-5 text-indigo-500" />;
      case 'Videos': return <PlayCircle className="w-5 h-5 text-red-500" />;
      case 'Tools': return <Briefcase className="w-5 h-5 text-teal-500" />;
      case 'Frameworks': return <Globe className="w-5 h-5 text-purple-500" />;
      default: return <ExternalLink className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div id="resources-library-container" className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-150 dark:border-slate-800 pb-6">
        <div>
          <h2 className="text-3xl font-bold font-display text-indigo-950 dark:text-white flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-indigo-650" />
            Curated Academic Library
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Discover vetted reference textbooks, YouTube courses, scientific repositories, and essential tools.
          </p>
        </div>
      </div>

      {/* Advanced search widget */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Keyword Search input */}
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            id="input-resource-search"
            type="text"
            placeholder="Search statistical learning, ISLR notes, scikit libraries, visualization toolkits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-850 pl-10 pr-4 py-2.5 rounded-xl text-xs text-gray-950 dark:text-white focus:outline-indigo-605"
          />
        </div>

        {/* Categories selector */}
        <div className="relative">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            id="select-resource-category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="w-full bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-850 pl-10 pr-4 py-2.5 rounded-xl text-xs text-gray-900 dark:text-gray-200 focus:outline-indigo-605 appearance-none"
          >
            <option value="all">All Category Modules</option>
            <option value="Books">Ref Books</option>
            <option value="Courses">Courses</option>
            <option value="Videos">Videos</option>
            <option value="Tools">Hardware / Core Tools</option>
            <option value="Frameworks">Frameworks</option>
          </select>
        </div>
      </div>

      {/* List items representation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((item, idx) => (
          <div 
            id={`resource-item-${idx}`}
            key={idx}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-150 dark:border-slate-850 flex flex-col justify-between hover:shadow-xs transition-shadow text-left space-y-4"
          >
            <div className="space-y-2.5">
              {/* Category tag */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[10px] font-bold font-mono tracking-wider text-indigo-650 dark:text-indigo-400 uppercase">
                  {getCategoryIcon(item.category)}
                  {item.category}
                </span>

                <span className="text-[10px] text-gray-400 font-mono italic">
                  By {item.author}
                </span>
              </div>

              {/* Title links */}
              <h3 className="text-base font-bold font-display text-gray-950 dark:text-white leading-tight">
                {item.title}
              </h3>

              <p className="text-xs text-gray-500 dark:text-gray-450 leading-relaxed line-clamp-3">
                {item.description}
              </p>
            </div>

            {/* Bottom details & Links */}
            <div className="pt-4 border-t border-gray-100 dark:border-slate-850/65 flex items-center justify-between gap-4 text-xs">
              <div className="flex flex-wrap items-center gap-1">
                {item.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="bg-gray-50 dark:bg-slate-950 text-gray-450 dark:text-indigo-450 text-[9px] font-mono font-medium px-2 py-0.5 rounded border border-gray-100 dark:border-slate-800">
                    #{tag}
                  </span>
                ))}
              </div>

              <a
                href={item.link}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50/50 hover:bg-indigo-150 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400 transition-colors font-bold font-mono"
              >
                <span>Access</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
