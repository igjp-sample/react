import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
import { useRef, useState, forwardRef, PropsWithChildren } from "react";
import {
  IIgrCategoryXAxisProps,
  IIgrColumnSeriesProps,
  IIgrRangeAreaSeriesProps,
  IIgrDataChartProps,
  IIgrNumericYAxisProps,
  IIgrNumericXAxisProps,
  IIgrBubbleSeriesProps,
  IIgrPieChartProps
} from 'igniteui-react-charts'


const SSR = typeof window === 'undefined'

interface IIgnDataChartProps extends IIgrDataChartProps {
  chartRef: any
}

const IgnDataChart = dynamic( async () => {
    let { IgrDataChart,
      IgrDataChartCategoryModule,
      IgrDataChartInteractivityModule,
      IgrDataChartVerticalCategoryModule } = await import('igniteui-react-charts');
      IgrDataChartCategoryModule.register();
      IgrDataChartInteractivityModule.register();
      IgrDataChartVerticalCategoryModule.register();

    const IgnDataChart = ({ chartRef, ...props}: IIgnDataChartProps) => {
      return <IgrDataChart ref={chartRef} {...props}></IgrDataChart>
    };
    IgnDataChart.displayName = "IgnDataChart";
    return IgnDataChart;
  }, { ssr: false } )

  const IgrDataChart = forwardRef<any, PropsWithChildren<IIgrDataChartProps>>((props, ref) => {
    return <IgnDataChart chartRef={ref} {...props}>{props.children}</IgnDataChart>
  });
  IgrDataChart.displayName = "IgrDataChart";


    interface IIgnPieChartProps extends IIgrPieChartProps {
      chartRef: any
    }

    const IgnPieChart = dynamic( async () => {
        let { IgrPieChart,
          IgrPieChartModule,
          IgrLegendModule } = await import('igniteui-react-charts');
          IgrPieChartModule.register();
          IgrLegendModule.register();

        const IgnPieChart = ({ chartRef, ...props}: IIgnPieChartProps) => {
          return <IgrPieChart ref={chartRef} {...props}></IgrPieChart>
        };
        IgnPieChart.displayName = "IgnPieChart";
        return IgnPieChart;
      }, { ssr: false } )

      const IgrPieChart = forwardRef<any, PropsWithChildren<IIgrPieChartProps>>((props, ref) => {
        return <IgnPieChart chartRef={ref} {...props}>{props.children}</IgnPieChart>
      });
      IgrPieChart.displayName = "IgrPieChart";


  interface IIgnNumericYAxisProps extends IIgrNumericYAxisProps {
    chartRef: any
  }

  const IgnNumericYAxis = dynamic( async () => {
    let { IgrNumericYAxis,
      IgrDataChartCategoryModule } = await import('igniteui-react-charts');
      IgrDataChartCategoryModule.register();

    const IgnNumericYAxis = ({ chartRef, ...props}: IIgnNumericYAxisProps) => {
      return <IgrNumericYAxis ref={chartRef} {...props}></IgrNumericYAxis>
    };
    IgnNumericYAxis.displayName = "IgnNumericYAxis";
    return IgnNumericYAxis;
  }, { ssr: false } )

  const IgrNumericYAxis = forwardRef<any, IIgrNumericYAxisProps>((props, ref) => {
    return <IgnNumericYAxis chartRef={ref} {...props}></IgnNumericYAxis>
  });
  IgrNumericYAxis.displayName = "IgrNumericYAxis";

  interface IIgnCategoryXAxisProps extends IIgrCategoryXAxisProps {
    chartRef: any
  }


  interface IIgnNumericXAxisProps extends IIgrNumericXAxisProps {
    chartRef: any
  }

  const IgnNumericXAxis = dynamic( async () => {
    let { IgrNumericXAxis,
      IgrDataChartCategoryModule } = await import('igniteui-react-charts');
      IgrDataChartCategoryModule.register();

    const IgnNumericXAxis = ({ chartRef, ...props}: IIgnNumericXAxisProps) => {
      return <IgrNumericXAxis ref={chartRef} {...props}></IgrNumericXAxis>
    };
    IgnNumericXAxis.displayName = "IgnNumericXAxis";
    return IgnNumericXAxis;
  }, { ssr: false } )

  const IgrNumericXAxis = forwardRef<any, IIgrNumericXAxisProps>((props, ref) => {
    return <IgnNumericXAxis chartRef={ref} {...props}></IgnNumericXAxis>
  });
  IgrNumericXAxis.displayName = "IgrNumericYAxis";

  interface IIgnCategoryXAxisProps extends IIgrCategoryXAxisProps {
    chartRef: any
  }

  const IgnCategoryXAxis = dynamic( async () => {
    let { IgrCategoryXAxis,
      IgrDataChartCategoryModule } = await import('igniteui-react-charts');
      IgrDataChartCategoryModule.register();

    const IgnCategoryXAxis = ({ chartRef, ...props}: IIgnCategoryXAxisProps) => {
      return <IgrCategoryXAxis ref={chartRef} {...props}></IgrCategoryXAxis>
    };
    IgnCategoryXAxis.displayName = "IgnCategoryXAxis";
    return IgnCategoryXAxis;
  }, { ssr: false } )

  const IgrCategoryXAxis = forwardRef<any, IIgrCategoryXAxisProps>((props, ref) => {
    return <IgnCategoryXAxis chartRef={ref} {...props}></IgnCategoryXAxis>
  });
  IgrCategoryXAxis.displayName = "IgrCategoryXAxis";

  interface IIgnColumnSeriesProps extends IIgrColumnSeriesProps {
    chartRef: any
  }

  const IgnColumnSeries = dynamic( async () => {
    let { IgrColumnSeries,
      IgrDataChartCategoryModule } = await import('igniteui-react-charts');
      IgrDataChartCategoryModule.register();

    const IgnColumnSeries = ({ chartRef, ...props}: IIgnColumnSeriesProps) => {
      return <IgrColumnSeries ref={chartRef} {...props}></IgrColumnSeries>
    };
    IgnColumnSeries.displayName = "IgnColumnSeries";
    return IgnColumnSeries;
  }, { ssr: false } )

  const IgrColumnSeries = forwardRef<any, IIgrColumnSeriesProps>((props, ref) => {
    return <IgnColumnSeries chartRef={ref} {...props}></IgnColumnSeries>
  });
  IgrColumnSeries.displayName = "IgrColumnSeries";


  interface IIgnRangeAreaSeriesProps extends IIgrRangeAreaSeriesProps {
    chartRef: any
  }

  const IgnRangeAreaSeries = dynamic( async () => {
    let { IgrRangeAreaSeries,
      IgrDataChartCategoryModule } = await import('igniteui-react-charts');
      IgrDataChartCategoryModule.register();

    const IgnRangeAreaSeries = ({ chartRef, ...props}: IIgnRangeAreaSeriesProps) => {
      return <IgrRangeAreaSeries ref={chartRef} {...props}></IgrRangeAreaSeries>
    };
    IgnRangeAreaSeries.displayName = "IgnRangeAreaSeries";
    return IgnRangeAreaSeries;
  }, { ssr: false } )

  const IgrRangeAreaSeries = forwardRef<any, IIgrRangeAreaSeriesProps>((props, ref) => {
    return <IgnRangeAreaSeries chartRef={ref} {...props}></IgnRangeAreaSeries>
  });
  IgrRangeAreaSeries.displayName = "IgrRangeAreaSeries";


  interface IIgnBubbleSeriesProps extends IIgrBubbleSeriesProps {
    chartRef: any
  }

  const IgnBubbleSeries = dynamic( async () => {
    let { IgrBubbleSeries,
      IgrDataChartCategoryModule } = await import('igniteui-react-charts');
      IgrDataChartCategoryModule.register();

    const IgnBubbleSeries = ({ chartRef, ...props}: IIgnBubbleSeriesProps) => {
      return <IgrBubbleSeries ref={chartRef} {...props}></IgrBubbleSeries>
    };
    IgnBubbleSeries.displayName = "IgnBubbleSeries";
    return IgnBubbleSeries;
  }, { ssr: false } )

  const IgrBubbleSeries = forwardRef<any, IIgrBubbleSeriesProps>((props, ref) => {
    return <IgnBubbleSeries chartRef={ref} {...props}></IgnBubbleSeries>
  });
  IgrBubbleSeries.displayName = "IgrBubbleSeries";


const data = [
  {
    month: 'January',
    temperature: 3,
    low: 1,
    high: 10,
    x: 10.0,
    y: 8.04
  },
  {
    month: 'February',
    temperature: 4,
    low: 2,
    high: 9,
    x: 8.0,
    y: 6.95
  },
  {
    month: 'March',
    temperature: 9,
    low: 3,
    high: 8,
    x: 13.0,
    y: 7.58
  },
  {
    month: 'April',
    temperature: 15,
    low: 1,
    high: 12,
    x: 9.0,
    y: 8.81
  },
  {
    month: 'May',
    temperature: 21,
    low: 4,
    high: 7,
    x: 11.0,
    y: 8.33
  },
  {
    month: 'June',
    temperature: 26,
    low: 5,
    high: 6,
    x: 14.0,
    y: 9.96
  },
  {
    month: 'July',
    temperature: 29,
    low: 4,
    high: 7,
    x: 6.0,
    y: 7.24
  },
  {
    month: 'August',
    temperature: 28,
    low: 3,
    high: 8,
    x: 4.0,
    y: 4.26
  },
  {
    month: 'September',
    temperature: 24,
    low: 2,
    high: 9,
    x: 12.0,
    y: 10.84
  },
  {
    month: 'October',
    temperature: 18,
    low: 1,
    high: 10,
    x: 7.0,
    y: 4.82
  },
  {
    month: 'November',
    temperature: 11,
    low: 2,
    high: 11,
    x: 5.0,
    y: 5.68
  },
  {
    month: 'December',
    temperature: 5,
    low: 4,
    high: 14,
    x: 8.0,
    y: 6.58
  },
];


const Home: NextPage = () => {

  return (
    <div className='flexRow'>
        <IgrDataChart
          chartTitle='Column'
          dataSource={data}
          width="200px"
          height="200px"
        >
          <IgrCategoryXAxis name="xAxis" label="month"></IgrCategoryXAxis>
          <IgrNumericYAxis name="yAxis"></IgrNumericYAxis>

          <IgrColumnSeries name="series1" valueMemberPath="temperature"
          xAxisName="xAxis"
          yAxisName="yAxis"
          ></IgrColumnSeries>
        </IgrDataChart>

        <IgrDataChart
          chartTitle='RangeArea'
          dataSource={data}
          width="200px"
          height="200px"
        >
          <IgrCategoryXAxis name="xAxis" label="month"></IgrCategoryXAxis>
          <IgrNumericYAxis name="yAxis"></IgrNumericYAxis>

          <IgrRangeAreaSeries name="series1" lowMemberPath="low" highMemberPath='high'
          xAxisName="xAxis"
          yAxisName="yAxis"
          ></IgrRangeAreaSeries>
        </IgrDataChart>

        <IgrDataChart
          chartTitle='Bubble'
          dataSource={data}
          width="200px"
          height="200px"
        >
          <IgrNumericXAxis name="xAxis"></IgrNumericXAxis>
          <IgrNumericYAxis name="yAxis"></IgrNumericYAxis>

          <IgrBubbleSeries name="series1" xMemberPath='x' yMemberPath='y'
          radiusMemberPath="temperature"
          xAxisName="xAxis"
          yAxisName="yAxis"

          ></IgrBubbleSeries>
        </IgrDataChart>

        <IgrPieChart
            width="200px"
            height="200px"
            dataSource={data}
            valueMemberPath="temperature"
            labelMemberPath="month"
            labelsPosition="BestFit"
            radiusFactor="0.7"
          >
        </IgrPieChart>
    </div>
  )
}

export default Home
