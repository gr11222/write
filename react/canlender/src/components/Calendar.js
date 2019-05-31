import React from 'React'
import './style.css'
const WEEK_NAMES = ['日', '一', '二', '三', '四', '五', '六']
const LINES = [1, 2, 3, 4, 5, 6]
const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

export default class Calendar extends React.Component {
	constructor() {
		super()
		this.state = {
			month: 0,
			year: 0,
			currentDate: new Date()
		}
	}

	componentWillMount() {
		this.setCurrentYearMonth(this.state.currentDate)
	}

	setCurrentYearMonth(date) {
		var month = Calendar.getMonth(date)
		var year = Calendar.getFullYear(date)
		this.setState({
			month,
			year
		})
	}

	static getMonth(date: Date): number {
		return date.getMonth()
	}

	static getFullYear(date: Date): number {
		return date.getFullYear()
	}

	static getCurrentMonthDays(month: number): number {
		return MONTH_DAYS[month]
	}

	static getWeeksByFirstDay(year: number, month: number): number {
		var date = Calendar.getDateByYearMonth(year, month)
		return date.getDay()
	}

	static getDayText(line: number, weekIndex: number, weekDay: number, monthDays: number): any {
		var number = line * 7 + weekIndex - weekDay + 1
		if (number <= 0 || number > monthDays) {
			return <span>&nbsp;</span>
		}

		return number
	}

	static formatNumber(num: number): string {
		var _num = num + 1
		return _num < 10 ? `0${_num}` : `${_num}`
	}

	static getDateByYearMonth(year: number, month: number, day: number = 1): Date {
		var date = new Date()
		date.setFullYear(year)
		date.setMonth(month, day)
		return date
	}

	checkToday(line: number, weekIndex: number, weekDay: number, monthDays: number): Boolean {
		var {
			year,
			month
		} = this.state
		var day = Calendar.getDayText(line, weekIndex, weekDay, monthDays)
		var date = new Date()
		var todayYear = date.getFullYear()
		var todayMonth = date.getMonth()
		var todayDay = date.getDate()

		return year === todayYear && month === todayMonth && day === todayDay
	}

	monthChange(monthChanged: number) {
		var {
			month,
			year
		} = this.state
		var monthAfter = month + monthChanged
		var date = Calendar.getDateByYearMonth(year, monthAfter)
		this.setCurrentYearMonth(date)
	}

	render() {
		var {
			year,
			month
		} = this.state
		console.log(this.state)

		var monthDays = Calendar.getCurrentMonthDays(month)
		var weekDay = Calendar.getWeeksByFirstDay(year, month)

		return (<div>
      {this.state.month}
      <table cellPadding={0} cellSpacing={0} className="table">
        <caption>
          <div className="caption-header">
            <span className="arrow" onClick={this.monthChange.bind(this, -1)}>&#60;</span>
            <span>{year} - {Calendar.formatNumber(month)}</span>
            <span className="arrow" onClick={this.monthChange.bind(this, 1)}>&gt;</span>
          </div>
        </caption>
        <thead>
          <tr>
            {
              WEEK_NAMES.map((week, key) => {
                return <td key={key}>{week}</td>
              })
            }
          </tr>
        </thead>
        <tbody>
        {
          LINES.map((l, key) => {
            return <tr key={key}>
              {
                WEEK_NAMES.map((week, index) => {
                  return <td key={index} style={{color: this.checkToday(key, index, weekDay, monthDays) ? 'red' : '#000'}}>
                    {Calendar.getDayText(key, index, weekDay, monthDays)}
                  </td>
                })
              }
            </tr>
          })
        }
        </tbody>
      </table>
    </div>)
	}
}