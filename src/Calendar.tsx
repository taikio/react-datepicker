import * as React from 'react';
import * as moment from 'moment';
import CalendarHead from './CalendarHead';
import CalendarBody from './CalendarBody';
import classNames from 'classnames';
import 'moment/locale/ko';


export interface Props {
  headerFormat?: string
  selected?: moment.Moment[]
  startDay?: moment.Moment
  endDay?: moment.Moment
  current?: moment.Moment
  locale?: string
  onChange?: (date: moment.Moment) => void
  customDayClass?: (date: moment.Moment) => string | string[]
  customDayText?: (date: moment.Moment) => string
  show?: boolean
}

interface State {
  current: moment.Moment
}

class Calendar extends React.Component<Props, State>{

  public static defaultProps = {
    headerFormat: "YYYY년 MM월",
    multiSelect: false,
    show: true,
    current: moment()
  }

  constructor(props: Props){
    super(props);
    this.state = {
      current: props.current!
    };
    moment.locale(props.locale);
  }

  handlePrev = () => {
    this.setState({
      current: this.state.current.subtract(1, 'months')
    });
  }

  handleNext = () => {
    this.setState({
      current: this.state.current.add(1, 'months')
    });
  }

  render() {
    const {
      headerFormat,
      customDayClass,
      customDayText,
      selected,
      onChange,
      startDay,
      endDay,
      show
    } = this.props;

    const {
      current,
    } = this.state;

    const calendarClass = classNames('calendar', {
      'calendar--show': show
    });

    return (
      <div className={calendarClass}>
        <CalendarHead
          onPrev={this.handlePrev} 
          onNext={this.handleNext} 
          title={current.format(headerFormat)}
        />
        <CalendarBody
          current={current} 
          selected={selected}
          startDay={startDay}
          endDay={endDay}
          onChange={onChange}
          customDayClass={customDayClass}
          customDayText={customDayText}
        />
      </div>
    )
  }
}


export default Calendar;
