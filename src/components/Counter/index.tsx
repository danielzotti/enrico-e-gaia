import { CounterItem } from './CounterItem/CounterItem';
import { DateTime, Duration, DurationUnit } from 'luxon';
import { useEffect, useState } from 'react';
import { DurationLikeObject } from 'luxon/src/duration';

import style from './index.module.scss';

export interface CounterProps {
  targetDate: Date | undefined;
  showDate?: boolean;
  variant?: 'small' | 'big';
  isVisible?: boolean;
}

export type Countdown = DurationLikeObject
  & {
  isDayPassed: boolean;
}

const countdownItemsOrder: Array<DurationUnit> = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];
const countdownShift: Array<DurationUnit> = ['years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'];
const countdownLabels: Record<keyof Omit<Countdown, 'isDayPassed'>, string> = {
  years: 'anni',
  quarters: 'quarti',
  months: 'mesi',
  days: 'giorni',
  weeks: 'settimane',
  hours: 'ore',
  minutes: 'minuti',
  seconds: 'secondi',
  milliseconds: 'millisecondi',
  year: 'anni',
  quarter: 'quarti',
  month: 'mesi',
  day: 'giorni',
  week: 'settimane',
  hour: 'ore',
  minute: 'minuti',
  second: 'secondi',
  millisecond: 'millisecondi'
};

const emptyCountdown: Countdown = {
  isDayPassed: true,
  years: 0,
  quarters: 0,
  months: 0,
  weeks: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0
};

const getDateTimeFromDate = (date: Date | undefined) => DateTime.fromJSDate(date || new Date()).setLocale('it');

export const Counter = ({
                          targetDate,
                          showDate = true,
                          variant = 'big',
                          isVisible = false
                        }: CounterProps): JSX.Element => {

  const [targetDateTime, setTargetDateTime] = useState<DateTime>(getDateTimeFromDate(targetDate));
  const [countdown, setCountdown] = useState<Countdown>(emptyCountdown);

  const getCountdownValue = (targetDateTime: DateTime): Countdown => {
    const now = DateTime.now();
    const diffMs = now.diff(targetDateTime).toMillis();
    const diffObject = Duration.fromMillis(diffMs).shiftTo(...countdownShift).toObject() || emptyCountdown;
    return { ...diffObject, isDayPassed: (diffObject as any).milliseconds > 0 };
  };

  const getCountdownItemsWithoutLeadingZero = () => {
    let hasFoundFirstNonZeroValue = false;
    let countdownItemsWithoutLeadingZero: Array<DurationUnit> = [];

    countdownItemsOrder.forEach((i) => {
      const itemValue = countdown[i];

      if(itemValue !== 0 || hasFoundFirstNonZeroValue || i === 'seconds') {
        countdownItemsWithoutLeadingZero.push(i);
      }

      if(!hasFoundFirstNonZeroValue && itemValue !== 0) {
        hasFoundFirstNonZeroValue = true;
      }

    });
    return countdownItemsWithoutLeadingZero;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown(getCountdownValue(targetDateTime));
    }, 1000);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    getCountdownValue(targetDateTime);
  }, [targetDateTime]);

  useEffect(() => {
    setTargetDateTime(getDateTimeFromDate(targetDate));
  }, [targetDate]);

  return (
    <div className={ style.container } style={ { opacity: isVisible ? 1 : 0 } }>
      { showDate && <h1 className={ style.title }>
        { targetDateTime.toFormat('dd MMMM yyyy HH:mm') }
        <br/>
        <small className={ style.subtitle }>{ getCountdownValue(targetDateTime).isDayPassed ? 'Sono passati' : 'Mancano' }</small>
      </h1> }
      <br/>
      {/*<h6 className={ style.subtitle }>
        { getCountdownValue(targetDateTime).isDayPassed ? 'Sono passati' : 'Mancano' }
      </h6>*/ }
      <div className={ style.counterContainer }>
        { getCountdownItemsWithoutLeadingZero().map(i =>
          <CounterItem key={ i } value={ countdown[i] } label={ countdownLabels[i] } variant={ variant }/>
        ) }
      </div>
    </div>
  );
};
