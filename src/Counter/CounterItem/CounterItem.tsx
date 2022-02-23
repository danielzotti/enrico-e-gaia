import style from './CounterItem.module.scss';

export interface CounterItemProps {
  value: number | undefined;
  label?: string;
}

export const CounterItem = ({ value = 0, label }: CounterItemProps): JSX.Element => {
  return (
    <div className={ style.container }>
      <div className={ style.label }>{ label }</div>
      <div className={ style.inner }>{ Math.abs(value) }</div>
    </div>
  );
};
