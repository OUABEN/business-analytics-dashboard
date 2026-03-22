import React from 'react';
import { 
  ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, CartesianGrid, Tooltip
} from 'recharts';

const AnalyticsChart = ({ type, data, dataKey, xKey, color = '#1d4ed8' }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ 
          background: '#06090f', 
          border: '1px solid rgba(255,255,255,0.1)', 
          padding: '12px', 
          borderRadius: '8px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)'
        }}>
          <p style={{ color: color, fontSize: '14px', fontWeight: '700' }}>${payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (type === 'line') {
      return (
        <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
          <XAxis 
            dataKey={xKey} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#475569', fontSize: 11, fontWeight: 700 }}
            dy={20}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#chartGradient)" 
            animationDuration={1500}
          />
        </AreaChart>
      );
    }
    
    if (type === 'pie') {
      const COLORS = ['#1d4ed8', '#10b981', '#475569'];
      return (
        <PieChart>
          <Pie
            data={data}
            innerRadius={80}
            outerRadius={105}
            paddingAngle={8}
            dataKey={dataKey}
            nameKey={xKey}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <text x="50%" y="48%" textAnchor="middle" dominantBaseline="middle" style={{ fill: '#fff', fontSize: '28px', fontWeight: '700' }}>
            12.4k
          </text>
          <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" style={{ fill: '#64748b', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Total Hits
          </text>
        </PieChart>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: 320 }}>
      <ResponsiveContainer>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
