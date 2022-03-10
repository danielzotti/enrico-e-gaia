import style from './CounterItem.module.scss';

export interface CounterItemProps {
  value: number | undefined;
  label?: string;
  variant: 'small' | 'big';
}

export const CounterItem = ({ value = 0, label, variant = 'big' }: CounterItemProps): JSX.Element => {
  return (
    variant === 'big' ?
      <div className={ `${ style.container } ${ style[variant] }` }>
        <div className={ `${ style.label }` }>{ label }</div>
        <div className={ `${ style.value }` }>{ Math.abs(value) }</div>
      </div>
      :
      <span className={ style.smallContainer }>
        <span className={ style.value }>{ `${ Math.abs(value) }` }</span>
        <span className={ style.label }>{ `${ label }` }</span>
      </span>
  );
};
