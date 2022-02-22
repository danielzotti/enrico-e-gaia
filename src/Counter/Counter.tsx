import { CounterItem } from './CounterItem';
import { DateTime, Duration, DurationUnit } from 'luxon';
import { useEffect, useState } from 'react';
import { DurationLikeObject } from 'luxon/src/duration';

export interface CounterProps {
  targetDate: Date;
}

export type Countdown = DurationLikeObject
  & {
  isDayPassed: boolean;
}

const countdownItemsOrder: Array<DurationUnit> = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];
const countdownShift: Array<DurationUnit> = ['years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'];

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

export const Counter = ({ targetDate }: CounterProps): JSX.Element => {

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
    <>
      <h1>Target date { targetDateTime.toFormat('dd/MM/yyyy hh:mm:ss') }</h1>
      <hr/>
      { countdownItemsOrder.map(i =>
        <CounterItem key={ i } value={ countdown[i] } label={ i }/>
      ) }
    </>
  );
};
