import React, { useState } from 'react';
import { Box, Container, useTheme } from '@mui/material';
import MalfunctionHeader from '../../components/Website/Malfunctions/MalfunctionHeader';
import MalfunctionForm from '../../components/Website/Malfunctions/MalfunctionForm';
import MalfunctionSuccess from '../../components/Website/Malfunctions/MalfunctionSuccess';

const Malfunctions = () => {
	const theme = useTheme();
	const [values, setValues] = useState({
		rank: '',
		name: '',
		coasts: '',
		location: '',
		reportType: '',
	});
	const [submitted, setSubmitted] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	const handleChange = (field, value) => {
		setValues((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async () => {
		setSubmitting(true);
		try {
			// TODO: integrate with API here
			await new Promise((res) => setTimeout(res, 500));
			setSubmitted(true);
			// You can console log or store locally for demo
			console.log('Malfunction report submitted:', values);
		} finally {
			setSubmitting(false);
		}
	};

	const handleReset = () => {
		setValues({ rank: '', name: '', coasts: '', location: '', reportType: '' });
		setSubmitted(false);
	};

	const handlePrint = () => {
		window.print();
	};

	return (
		<Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3 } }}>
			<Box sx={{ mb: { xs: 2, sm: 3 } }}>
				<MalfunctionHeader />
			</Box>

			{!submitted ? (
				<MalfunctionForm
					values={values}
					onChange={handleChange}
					onSubmit={handleSubmit}
					submitting={submitting}
				/>
			) : (
				<MalfunctionSuccess data={values} onClose={handleReset} onPrint={handlePrint} />)
			}
		</Container>
	);
};

export default Malfunctions;
