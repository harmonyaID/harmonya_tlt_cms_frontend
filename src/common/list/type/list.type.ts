import { DataListItem } from '@/type/dataList.type'

interface LoopDataConfig {
   titleColumn?: string
   contentColumn?: string
}

export interface HorizontalLoopDataLogicProps {
   list?: DataListItem[]
   config?: LoopDataConfig
   className?: string
   isLastMarginBottom?: boolean
}

export interface VerticalLoopDataLogicProps {
   list?: Array<Record<string, any>>
   config?: LoopDataConfig
}
