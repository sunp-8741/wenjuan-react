import { FC, useEffect, useRef, useState } from 'react'
import { QuestionCard } from '@/components/QuestionCard.tsx'
import { Empty, Spin, Typography } from 'antd'
import { ListSearch } from '@/components/ListSearch.tsx'
import { IQuestion } from '@/types/question.ts'
import { useDebounceFn, useRequest, useTitle } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '@/services/question.ts'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '@/constant'

const { Title } = Typography
export const List: FC = () => {
  useTitle('问卷')

  const [started, setStarted] = useState(false)
  const [page, setPage] = useState(1)
  const [list, setList] = useState<IQuestion[]>([])
  const [total, setTotal] = useState(0)
  const havMoreData = total > list.length
  const [searchParam] = useSearchParams()
  const keyword = searchParam.get(LIST_SEARCH_PARAM_KEY) || ''

  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])
  const containerRef = useRef<HTMLDivElement>(null)

  const { run: load, loading } = useRequest(
    async () => {
      return await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword: searchParam.get(LIST_SEARCH_PARAM_KEY) || '',
      })
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: newList = [], total = 0 } = result
        setList(list.concat(newList))
        setTotal(total)
        setPage(page + 1)
      },
    }
  )

  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (!elem) return ''
      const domRect = elem.getBoundingClientRect()
      const { bottom } = domRect
      if (bottom <= document.body.clientHeight) {
        load()
        setStarted(true)
      }
    },
    {
      wait: 1000,
    }
  )

  useEffect(() => {
    if (havMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParam, havMoreData])

  useEffect(() => {
    tryLoadMore()
  }, [searchParam])

  const LoadMoreContentElem = () => {
    if (!started || loading) return <Spin />
    if (!total) return <Empty />
    if (!havMoreData) return <span>没有更多了</span>
    return <span>加载中</span>
  }

  return (
    <>
      <header className="flex justify-between">
        <div className="flex-1">
          <Title level={3}>我的问卷</Title>
        </div>
        <div className="text-right">
          <ListSearch />
        </div>
      </header>
      <div className="mb-5">
        {list.length &&
          list.map((q: IQuestion) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className="text-center">
        <div ref={containerRef}>{LoadMoreContentElem()}</div>
      </div>
    </>
  )
}
