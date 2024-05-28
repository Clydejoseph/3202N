import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DashComponent from './DashComponent';
import { Equipments } from '../dataExport/EquipmentCounts';

// Mock data for Equipments
jest.mock('../dataExport/EquipmentCounts', () => ({
  Equipments: [
    { title: 'System Unit', count: 10 },
    { title: 'Monitor', count: 20 },
    { title: 'Mouse', count: 30 },
    { title: 'Keyboard', count: 40 },
  ],
}));

describe('DashComponent', () => {
  test('renders all CardDash components with correct props', () => {
    render(<DashComponent />);

    // Verify the CardDash components are rendered with correct titles and counts
    const systemUnitElement = screen.getByText('SYSTEM UNIT');
    expect(systemUnitElement).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();

    const monitorElement = screen.getByText('MONITOR');
    expect(monitorElement).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();

    const mouseElement = screen.getByText('MOUSE');
    expect(mouseElement).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();

    const keyboardElement = screen.getByText('KEYBOARD');
    expect(keyboardElement).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();

    const defectElement = screen.getByText('DEFECT');
    expect(defectElement).toBeInTheDocument();
    expect(screen.getByText('10000')).toBeInTheDocument();
  });
});
