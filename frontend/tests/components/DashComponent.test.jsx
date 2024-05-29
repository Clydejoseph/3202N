import { render, screen } from '@testing-library/react';
import DashComponent from '../../src/component/DashComponent.jsx'; // Assuming the correct path

const mockEquipments = [
  { title: 'System Unit', count: 20 },
  { title: 'Monitor', count: 30 },
  { title: 'Mouse', count: 15 },
  { title: 'Keyboard', count: 25 },
  { title: 'Defect', count: 10000 }, // Add defect card data
];

describe('DashComponent', () => {
  test('renders the component with equipment cards', () => {
    render(<DashComponent equipments={mockEquipments} />); // Pass data as a prop

    // Use screen queries to assert expected elements (targeting nested Text)
    const equipmentTitles = screen.getAllByRole('heading').map(el => el.textContent); // Get text content of headings
    expect(equipmentTitles).toHaveLength(5); // 5 equipment titles

    // Optionally, test specific equipment titles
    expect(screen.getByText(/system unit/i)).toBeInTheDocument(); // Example for specific title
  });
});