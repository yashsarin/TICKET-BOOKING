import React from 'react';

export default function SeatGrid({ seats, booked = [], selected = [], onSelect }: any) {
  const handle = (num: number) => {
    if (booked.includes(num)) return;

    onSelect((prev: number[]) => {
      const has = prev.includes(num);
      return has ? prev.filter(x => x !== num) : [...prev, num];
    });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8,48px)', gap: 8 }}>
      {seats.map((n: number) => {
        const isBooked = booked.includes(n);
        const isSelected = selected.includes(n);
        return (
          <div
            key={n}
            data-seat={n}
            className="seat"
            onClick={() => handle(n)}
            style={{
              padding: 8,
              border: '1px solid #333',
              borderRadius: 4,
              background: isBooked ? '#ddd' : isSelected ? '#8f8' : undefined,
              cursor: isBooked ? 'not-allowed' : 'pointer'
            }}
          >
            {n}
          </div>
        );
      })}
    </div>
  );
}
