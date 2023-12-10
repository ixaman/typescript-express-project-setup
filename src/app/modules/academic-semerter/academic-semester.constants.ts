import {
  TMonths,
  TSemesterCode,
  TSemesterName,
  TsemesterNameCodeMapper,
} from './academic-semester.interface'

export const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const semesterNameCodeMapper: TsemesterNameCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}

export const SemestersName: TSemesterName[] = ['Autumn', 'Summer', 'Fall']

export const SemestersCode: TSemesterCode[] = ['01', '02', '03']
