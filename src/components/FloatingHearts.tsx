import { useEffect, useState } from 'react';
import clapperboardImage from '@/assets/clapperboard.png';

interface FloatingItem {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

const FloatingHearts = () => {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    const generatedItems: FloatingItem[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
      size: 12 + Math.random() * 16,
    }));
    setItems(generatedItems);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item) => (
        <img
          key={item.id}
          src={clapperboardImage}
          alt=""
          className="absolute opacity-20"
          style={{
            left: `${item.left}%`,
            bottom: '-20px',
            width: `${item.size}px`,
            height: `${item.size}px`,
            animation: `float-up ${item.duration}s ease-in-out infinite`,
            animationDelay: `${item.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingHearts;
