import { useNavigate } from 'react-router-dom';
import { useCategories } from '../hooks/useDb';
import { settingsService } from '../db';

export default function Onboarding() {
  const { categories } = useCategories();
  const navigate = useNavigate();

  const handleSelect = async (categoryId: string) => {
    await settingsService.setSelectedCategory(categoryId);
    navigate('/logger');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-tg-bg p-4">
      <h1 className="text-2xl font-bold text-tg-text mb-6">Pick your habit</h1>
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-tg-secondary border-2 border-transparent hover:border-tg-button active:scale-95 transition-all"
          >
            <span className="text-5xl mb-2">{cat.emoji}</span>
            <span className="text-tg-text font-medium">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

