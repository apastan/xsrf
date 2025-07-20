import './App.css'
import axios from 'axios'

const instance = axios.create({
    baseURL: '/api/',
})
    // /api/company/vacancy/4/history_bulk

export interface ChatTemplate {
    // name: 'INVITE_HR' | 'INVITE_AI' | 'REJECT' | 'OFFER'
    emoji: string
    label: string
    text: string
}

export interface CandidateChatTemplate {
    data: ChatTemplate[]
}

export const CandidatesBulkActionFailReason = {
    not_tg_uid: 'нет Telegram Id',
    bot_was_blocked: 'Telegram-бот заблокирован',
    unknown_reason: 'причина неизвеста',
} as const

export interface CandidatesBulkActionResponse {
    failed_candidates?: Array<{
        id: string
        first_name: string
        second_name: string
        reason: keyof typeof CandidatesBulkActionFailReason
    }>
}

export type CompanyChatTemplateNames = 'STATUS' | 'INVITE_HR' | 'INVITE_AI' | 'REJECT'

export interface CandidatesBulkAction {
    candidates: string[] // массив id кандидатов
    type: CompanyChatTemplateNames // если нужно расширять - 'STATUS' | 'INVITE_HR' | 'INVITE_AI' | 'REJECT' | 'OFFER'
    value: string // кастомный текст сообщения или один из статусов
}

const candidatesBulkActionAPI = (params: { vacancyId: string; body: CandidatesBulkAction }) =>
    instance.put<CandidatesBulkActionResponse>(`/company/vacancy/${params.vacancyId}/history_bulk`, params.body)

function App() {

    const handleCLick = () => {
        return candidatesBulkActionAPI({vacancyId: '4', body: {candidates: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'], type:  'STATUS', value: 'Approved'}})
    }


  return (
    <>
      <button type={`button`} onClick={handleCLick}>
          Получить выигрыш
      </button>
    </>
  )
}

export default App
