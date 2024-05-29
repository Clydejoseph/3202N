import { render } from '@testing-library/react';
import PieChart from '../../src/component/charts/PieChart.jsx'; // Replace with your component path

describe('PieChart component', () => {
  it('renders the pie chart with provided data', () => {
    const mockData = {
      activeData: { count: 10 },
      disposeData: { count: 5 },
      defectiveData: { count: 2 },
      donateData: { count: 3 },
    };

    const { getByRole } = render(<PieChart {...mockData} />);

    const pieChart = getByRole('graphics'); // Adjust selector if needed

    expect(pieChart).toBeInTheDocument();
  });

  it('displays correct labels and data points', () => {
    const mockData = {
      activeData: { count: 10 },
      disposeData: { count: 5 },
      defectiveData: { count: 2 },
      donateData: { count: 3 },
    };
  
    const { getByText } = render(<PieChart {...mockData} />);
  
    const activeLabel = getByText((content, element) => content.includes('Active') && element.classList.contains('my-label-class'));
  
    expect(activeLabel).toBeInTheDocument();
   
  });
  });

