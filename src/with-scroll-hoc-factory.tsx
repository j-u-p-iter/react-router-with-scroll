import * as React from "react";
import { RouteComponentProps } from "react-router";

export const withScrollHocFactory = (
  disableScrollStrategy: (...args: any[]) => any
) =>
  function<P>(WrappedComponent: React.ComponentType<P>) {
    type WithScrollProps = RouteComponentProps<any> & P;

    return class extends React.Component<WithScrollProps, any> {
      public componentDidUpdate({
        location: { pathname: prevPathname }
      }: WithScrollProps) {
        const {
          location: { pathname: newPathname }
        } = this.props as WithScrollProps;

        const isScrollDisabled = disableScrollStrategy;

        if (!isScrollDisabled(prevPathname, newPathname)) {
          window.scrollTo(0, 0);
        }
      }

      public render() {
        return <WrappedComponent {...this.props} />;
      }
    };
  };
