import { CounterItem } from './CounterItem/CounterItem';
import { DateTime, Duration, DurationUnit } from 'luxon';
import { useEffect, useState } from 'react';
import { DurationLikeObject } from 'luxon/src/duration';

import style from './index.module.scss';


export interface CounterProps {
  targetDate: Date;
  showDate?: boolean;
}

export type Countdown = DurationLikeObject
  & {
  isDayPassed: boolean;
}

const countdownItemsOrder: Array<DurationUnit> = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];
const countdownShift: Array<DurationUnit> = ['years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'];
// const countdownLabels: Record<keyof Omit<Countdown, 'isDayPassed'>, string> = {
//   years: 'anni',
//   quarters: 'quarti',
//   months: 'mesi',
//   days: 'giorni',
//   weeks: 'settimane',
//   hours: 'ore',
//   minutes: 'minuti',
//   seconds: 'secondi',
//   milliseconds: 'millisecondi'
// };

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

export const Counter = ({ targetDate, showDate = true }: CounterProps): JSX.Element => {

  const [targetDateTime] = useState<DateTime>(DateTime.fromJSDate(targetDate));
  const [countdown, setCountdown] = useState<Countdown>(emptyCountdown);

  const getCountdownValue = (targetDateTime: DateTime): Countdown => {
    const now = DateTime.now();
    const diffMs = now.diff(targetDateTime).toMillis();
    const diffObject = Duration.fromMillis(diffMs).shiftTo(...countdownShift).toObject() || emptyCountdown;
    return { ...diffObject, isDayPassed: (diffObject as any).milliseconds < 0 };
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

  return (
    <div className={ style.container }>
      { showDate && <h1 className={ style.title }>{ targetDateTime.toFormat('dd/MM/yyyy hh:mm') }</h1> }
      <div className={ style.counterContainer }>
        { countdownItemsOrder.map(i =>
          <CounterItem key={ i } value={ countdown[i] } label={ i }/>
        ) }
      </div>
    </div>
  );
};
