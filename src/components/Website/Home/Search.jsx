import React, { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import Fade from '@mui/material/Fade'
// Results UI
import SearchResult from './SearchResult'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import SearchIcon from '@mui/icons-material/Search'

// Convert Arabic-Indic and Persian digits to ASCII digits
const normalizeDigits = (text = '') =>
  text
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));

// Normalize Arabic text for robust matching (remove diacritics, unify letters, trim, normalize digits)
const normalizeArabic = (text = '') => {
  const s = text
    .toLowerCase()
    .trim()
    // remove tatweel
    .replace(/\u0640/g, '')
    // remove diacritics (harakat)
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
    // unify alef forms (أ إ آ) -> ا
    .replace(/[\u0622\u0623\u0625]/g, '\u0627')
    // alef maksura ى -> ي
    .replace(/\u0649/g, '\u064A')
    // taa marbuta ة -> ه (approximate for search)
    .replace(/\u0629/g, '\u0647');
  return normalizeDigits(s);
};

// Dummy data to simulate employee results
const DUMMY_DATA = [
  {
    id: 1,
    name: 'أحمد محمد',
  coastalNumber: '12345',
    title: 'فني اتصالات',
    distribution: 'الفريق أ',
    pickupLocation: 'مخزن الشويخ',
    date: '2025-08-10',
  },
  {
    id: 2,
    name: 'سارة علي',
  coastalNumber: '98765',
    title: 'مشرف صيانة',
    distribution: 'الفريق ب',
    pickupLocation: 'مخزن الفحيحيل',
    date: '2025-08-11',
  },
  {
    id: 3,
    name: 'يوسف خالد',
  coastalNumber: '24680',
    title: 'مهندس شبكات',
    distribution: 'الفريق ج',
    pickupLocation: 'مركز حولي',
    date: '2025-08-12',
  },
  {
    id: 4,
    name: 'مريم عبدالله',
  coastalNumber: '13579',
    title: 'مسؤولة موارد بشرية',
    distribution: 'الإدارة',
    pickupLocation: 'المقر الرئيسي',
    date: '2025-08-12',
  },
  {
    id: 5,
    name: 'فهد ناصر',
  coastalNumber: '55555',
    title: 'سائق',
    distribution: 'الدعم اللوجستي',
    pickupLocation: 'ساحة القرين',
    date: '2025-08-09',
  },
]

const mockSearchApi = (query) => {
  return new Promise((resolve) => {
    const q = normalizeArabic(query)
    setTimeout(() => {
      if (!q) return resolve([])
      const results = DUMMY_DATA.filter((item) => {
        const name = normalizeArabic(item.name)
        const coastal = normalizeArabic(String(item.coastalNumber || ''))
        return name.includes(q) || coastal.includes(q)
      })
      resolve(results)
    }, 200)
  })
}

const Search = ({ onSearchStateChange }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const lastSearchRef = useRef(0)

  const handleSubmit = (e) => {
    // Prevent submit; we do live search on input
    e.preventDefault()
  }

  // Debounced live search when typing
  useEffect(() => {
    const q = query.trim()
    const hasQuery = q.length > 0
    
    // Notify parent about search state change
    if (onSearchStateChange) {
      onSearchStateChange(hasQuery)
    }
    
    if (!q) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    const requestId = (lastSearchRef.current || 0) + 1
    lastSearchRef.current = requestId

    const timer = setTimeout(async () => {
      const data = await mockSearchApi(q)
      if (lastSearchRef.current === requestId) {
        setResults(data)
        setLoading(false)
      }
    }, 350)

    return () => clearTimeout(timer)
  }, [query, onSearchStateChange])

  return (
    <Box>
      <Paper sx={{ p: { xs: 2, sm: 2.5 }, borderRadius: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث برقم السواحل أو جزء من الاسم ..."
            aria-label="حقل البحث"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="button" aria-label="بحث">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Paper>

      <Collapse in={query.trim().length > 0} timeout={500}>
        <Box sx={{ my: 3 }}>
          <Fade in={query.trim().length > 0} timeout={400}>
            <Box>
              <SearchResult results={results} loading={loading} query={query} />
            </Box>
          </Fade>
        </Box>
      </Collapse>
    </Box>
  )
}

export default Search
