import { render, screen } from '@testing-library/react';
import DashComponent from '../../src/component/DashComponent.jsx'; 

const mockEquipments = [
  { title: 'System Unit', count: 20 },
  { title: 'Monitor', count: 30 },
  { title: 'Mouse', count: 15 },
  { title: 'Keyboard', count: 25 },
  { title: 'Defect', count: 10000 }, // Add defect card data
];

describe('DashComponent', () => {
  test('renders the component with equipment cards', () => {
    render(<DashComponent equipments={mockEquipments} />); //mock data


    const equipmentTitles = screen.getAllByRole('heading').map(el => el.textContent); 
    expect(equipmentTitles).toHaveLength(5); 


    expect(screen.getByText(/system unit/i)).toBeInTheDocument(); 
  });
});
