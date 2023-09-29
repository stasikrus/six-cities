import { render, screen } from '@testing-library/react';
import { EmptyList } from './empty-list';
import { CITY } from '../../const';

describe('Component: EmptyList', () => {
  it('should be rendered correctly', () => {
    render(<EmptyList city={CITY[0]} />)

    expect(screen.getByText(new RegExp(`(${CITY[0]})`))).toBeInTheDocument();
  })
});
