import { FC, useMemo } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { STAT_COLORS } from '@/constant'
import { QuestionRadioStatPropsType } from '@/components/QuestionComponents/QuestionRadio/interface.ts'
import { sumBy } from 'lodash'
function format(num: number) {
  return (num * 100).toFixed(2)
}
export const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat = [] }) => {
  const total = useMemo(() => {
    return sumBy(stat, 'count')
  }, [stat])
  return (
    <div className="w-[300px] h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={stat}
            dataKey="count"
            cx="50%"
            cy="50%"
            fill="#8884d8"
            outerRadius={50}
            label={i => `${i.name}: ${format(i.count / total)}%`}
          >
            {stat.map((_, index) => {
              return <Cell key={index} fill={STAT_COLORS[index]} />
            })}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
