import { 
  Paper, 
  Box,
} from '@mui/material';
import DistributionTables from './DistributionTables';
import SystemHeader from '../../Ui/SystemHeader';
import printCrews from './PrintCrews';
import { useEffect, useMemo } from 'react';


const specificDistribution = [
  "893e4990-0bfc-4099-8a0f-0417019f4893", // R41
  "68dd8b1e-94f9-4b38-bd74-168db2c6cb9a", // 706
]

const Crews = ({ employees, isNav, onNavFreely }) => {
  const squadName = employees[0]?.squadName || "السرية الاولي";

  useEffect(() => {
    if(isNav) {
      onNavFreely(true);
    }
  }, [isNav]);

  const distributions = useMemo(() => {
    const grouped = employees.reduce((acc, emp) => {
      const placeKey = emp.distributionPlaceId || "no-distribution";

      // Initialize distribution place if not exists
      if (!acc[placeKey]) {
        acc[placeKey] = {
          distributionPlaceId: emp.distributionPlaceId,
          distributionPlaceName: emp.distributionPlaceName || "بدون توزيع",
          people: [],
          statistics: {} // temporary object
        };
      }

      // push person
      acc[placeKey].people.push(emp);

      // group by category
      const catKey = emp.categoryName || "غير محدد";
      if (!acc[placeKey].statistics[catKey]) {
        acc[placeKey].statistics[catKey] = {
          name: catKey,
          total: 0,
          present: 0,
          absence: 0
        };
      }

      acc[placeKey].statistics[catKey].total += 1;
      if (emp.attendance) {
        acc[placeKey].statistics[catKey].present += 1;
      } else {
        acc[placeKey].statistics[catKey].absence += 1;
      }

      return acc;
    }, {});

    // convert statistics from object → array
    return Object.values(grouped).map(place => ({
      ...place,
      statistics: specificDistribution.includes(place.distributionPlaceId)
        ? Object.values(place.statistics) // keep real stats
        : [] // reset to empty if not in specificDistribution
    }));
  }, [employees]);

  console.log("distributions: ", distributions);


  return (
    <Box sx={{ py: 3 }}>
      <Paper elevation={1} sx={{ p: { xs: 1.5, sm: 2, md: 3 }, borderRadius: 2 }}>
        <SystemHeader
          title={"إدارة الطواقم"}
          isPrinting={true}
          isSaving={false}
          printFn={() => printCrews(distributions, squadName)}
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 3
          }}
        >
          {distributions.map((distribution, i) => (
            <Box key={i}>
              <DistributionTables distribution={distribution} />
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default Crews;
