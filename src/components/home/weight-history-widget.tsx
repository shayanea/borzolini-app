import { Image, LayoutChangeEvent, Text, View } from 'react-native';
import { useMemo, useState } from 'react';

import { Card } from '@/components/ui/card';
import weightHistoryIcon from '../../../assets/icons/scales.png';

interface WeightDataPoint {
  id: string;
  month: string;
  weight: number;
}

const weightHistory: WeightDataPoint[] = [
  { id: 'oct', month: 'Oct', weight: 22 },
  { id: 'nov', month: 'Nov', weight: 23 },
  { id: 'dec', month: 'Dec', weight: 23.6 },
  { id: 'jan', month: 'Jan', weight: 24.2 },
  { id: 'feb', month: 'Feb', weight: 24.6 },
];

const MIN_WEIGHT = 21;
const MAX_WEIGHT = 25.2;
const CHART_HEIGHT = 160; // h-40 = 160px
const POINT_SIZE = 12; // w-3 h-3 = 12px
const POINT_OFFSET = 6; // margin offset for centering

function getPointX(index: number, total: number, width: number): number {
  if (total === 1) return width / 2;
  return (index / (total - 1)) * width;
}

function getPointY(weight: number, height: number): number {
  const clamped = Math.min(Math.max(weight, MIN_WEIGHT), MAX_WEIGHT);
  const ratio = (clamped - MIN_WEIGHT) / (MAX_WEIGHT - MIN_WEIGHT);
  return height - ratio * height;
}

interface PointPosition {
  x: number;
  y: number;
}

interface LineSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  angle: number;
  length: number;
}

export function WeightHistoryWidget(): JSX.Element {
  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(CHART_HEIGHT);

  const handleChartLayout = (event: LayoutChangeEvent): void => {
    const { width, height } = event.nativeEvent.layout;
    setChartWidth(width);
    if (height > 0) {
      setChartHeight(height);
    }
  };

  const pointPositions = useMemo<PointPosition[]>(() => {
    if (chartWidth === 0) return [];
    return weightHistory.map((point, index) => ({
      x: getPointX(index, weightHistory.length, chartWidth),
      y: getPointY(point.weight, chartHeight),
    }));
  }, [chartWidth, chartHeight]);

  const lineSegments = useMemo<LineSegment[]>(() => {
    if (pointPositions.length < 2) return [];
    const segments: LineSegment[] = [];
    for (let i = 1; i < pointPositions.length; i++) {
      const p1 = pointPositions[i - 1];
      const p2 = pointPositions[i];
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      segments.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, angle, length });
    }
    return segments;
  }, [pointPositions]);

  const pointStyles = useMemo(() => {
    return pointPositions.map(pos => ({
      position: 'absolute' as const,
      left: pos.x - POINT_OFFSET,
      bottom: chartHeight - pos.y - POINT_OFFSET,
      width: POINT_SIZE,
      height: POINT_SIZE,
    }));
  }, [pointPositions, chartHeight]);

  const segmentStyles = useMemo(() => {
    return lineSegments.map(segment => {
      // Calculate the midpoint between the two data points.
      const midX = (segment.x1 + segment.x2) / 2;
      const midY = (segment.y1 + segment.y2) / 2;

      // Position the container so that its centre is the midpoint. Rotate the
      // container itself; the line inside can stay horizontal.
      const containerStyle = {
        position: 'absolute' as const,
        left: midX - segment.length / 2,
        bottom: chartHeight - midY,
        width: segment.length,
        height: 2,
        transform: [{ rotateZ: `${segment.angle}rad` }],
      };

      const lineStyle = {
        width: segment.length,
        height: 2,
        backgroundColor: '#a855f7' as const,
      };

      return { container: containerStyle, line: lineStyle };
    });
  }, [lineSegments, chartHeight]);

  return (
    <View className="mt-8">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <Image
            source={weightHistoryIcon}
            className="w-5 h-5 mr-2"
            resizeMode="contain"
            tintColor="#ff8904"
          />
          <Text className="text-white font-bold text-lg">Weight History</Text>
        </View>
      </View>

      {/* Card */}
      <Card className=" border border-white/5 px-4 pt-6 pb-5">
        {/* Y-axis labels */}
        <View className="absolute left-4 top-6 bottom-10 justify-between">
          <Text className="text-xs text-gray-500">{MAX_WEIGHT}</Text>
          <Text className="text-xs text-gray-500">
            {((MIN_WEIGHT + MAX_WEIGHT) / 2).toFixed(1)}
          </Text>
          <Text className="text-xs text-gray-500">{MIN_WEIGHT}</Text>
        </View>

        {/* Graph area */}
        <View className="ml-10">
          <View className="h-40" onLayout={handleChartLayout}>
            {/* Horizontal grid lines */}
            <View className="absolute left-0 right-0 top-0 border-t border-dashed border-white/10" />
            <View className="absolute left-0 right-0 top-1/2 border-t border-dashed border-white/10" />
            <View className="absolute left-0 right-0 bottom-0 border-t border-dashed border-white/10" />

            {/* Line segments */}
            {segmentStyles.map((styles, index) => (
              <View key={`segment-${index}`} style={styles.container}>
                <View style={styles.line} />
              </View>
            ))}

            {/* Data points */}
            {pointStyles.map((pointStyle, index) => (
              <View
                key={weightHistory[index].id}
                style={pointStyle}
                className="rounded-full bg-[#a855f7]"
              />
            ))}
          </View>

          {/* X-axis labels */}
          <View className="mt-3 flex-row justify-between pr-1">
            {weightHistory.map(point => (
              <Text key={`${point.id}-label`} className="text-xs text-gray-500">
                {point.month}
              </Text>
            ))}
          </View>
        </View>
      </Card>
    </View>
  );
}
