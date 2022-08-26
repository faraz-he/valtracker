import { GlobalStyles } from '../GlobalStyles/GlobalStyles';
import { ChildrenOnly } from '../common/types';
import { Root } from './Root';

export const GlobalWrappers = ({ children }: ChildrenOnly) => (
  <>
    <GlobalStyles />
    <Root>{children}</Root>
  </>
);
