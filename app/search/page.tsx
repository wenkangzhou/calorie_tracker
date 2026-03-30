'use client';

import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FoodCard } from '@/components/food/FoodCard';
import { FoodDetail } from '@/components/food/FoodDetail';
import { searchFoods, foodDatabase, categories, getCategoryLabel } from '@/lib/foodDatabase';
import { Food } from '@/types';
import { Search, ArrowLeft, Clock, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { useDebounce } from '@/hooks/useDebounce';

export default function SearchPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { recentFoods, favorites } = useStore();

  const [query, setQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const debouncedQuery = useDebounce(query, 300);

  const searchResults = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    return searchFoods(debouncedQuery, i18n.language);
  }, [debouncedQuery, i18n.language]);

  const favoriteFoods = useMemo(() => {
    return foodDatabase.filter((food) => favorites.includes(food.id));
  }, [favorites]);

  const filteredFoods = useMemo(() => {
    if (selectedCategory) {
      return foodDatabase.filter((food) => food.category === selectedCategory);
    }
    return foodDatabase;
  }, [selectedCategory]);

  const handleFoodClick = (food: Food) => {
    setSelectedFood(food);
    setDetailOpen(true);
  };

  const displayFoods = query.trim() 
    ? searchResults 
    : activeTab === 'favorites' 
      ? favoriteFoods 
      : activeTab === 'recent' 
        ? recentFoods 
        : filteredFoods;

  return (
    <div className="page-transition pb-24 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b px-4 py-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">{t('search.title')}</h1>
        </div>

        {/* Search Input */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t('search.placeholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>
      </header>

      <div className="px-4 py-4">
        {/* Tabs */}
        {!query.trim() && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">{t('search.allFoods')}</TabsTrigger>
              <TabsTrigger value="recent">
                <Clock className="w-4 h-4 mr-1" />
                {t('search.recent')}
              </TabsTrigger>
              <TabsTrigger value="favorites">
                <Heart className="w-4 h-4 mr-1" />
                {t('search.favorites')}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        {/* Category Filter */}
        {activeTab === 'all' && !query.trim() && (
          <div className="mb-6">
            <h2 className="text-sm font-medium text-muted-foreground mb-3">
              {t('search.categories')}
            </h2>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                {t('search.allFoods')}
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {getCategoryLabel(category, i18n.language)}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        <div className="space-y-3">
          {query.trim() && searchResults.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">{t('search.noResults')}</p>
            </div>
          ) : displayFoods.length === 0 ? (
            <div className="text-center py-12">
              {activeTab === 'recent' ? (
                <>
                  <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">{t('search.noResults')}</p>
                </>
              ) : activeTab === 'favorites' ? (
                <>
                  <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">{t('search.noResults')}</p>
                </>
              ) : (
                <>
                  <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">{t('search.noResults')}</p>
                </>
              )}
            </div>
          ) : (
            displayFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                onClick={() => handleFoodClick(food)}
              />
            ))
          )}
        </div>
      </div>

      <FoodDetail
        food={selectedFood}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </div>
  );
}
