"use client";

import { useEffect, useMemo, useState } from "react";
import courseApiWrapper, { Term } from "course-api-wrapper";
import TermSelectorCombobox from "@components/TermSelector/TermSelectorCombobox";

interface TermSelectorProps {
  updateTermSelection: (term: {
    year: number | null;
    term: Term | null;
  }) => void;
}

const LOADING_TEXT = "Loading...";
const NO_OFFERINGS_TEXT = "No Offerings";
// const API_ERROR_TEXT = "API Error";
const API_ERROR_TEXT = "";

export default function TermSelector(props: TermSelectorProps) {
  const [year, setYear] = useState<number | null>(null);
  const [years, setYears] = useState<number[] | null | undefined>(undefined);

  const [term, setTerm] = useState<Term | null>(null);
  const [terms, setTerms] = useState<Term[] | null | undefined>(undefined);

  const onOptionSubmitYear = (value: string) => {
    const selectedYear = parseInt(value);

    if (year === selectedYear) {
      return;
    }

    setYear(selectedYear);
    setTerms(undefined);
    setTerm(null);
  };

  const onOptionSubmitTerm = (value: string) => {
    const selectedTerm = value.toLowerCase() as Term;

    if (term === selectedTerm) {
      return;
    }

    setTerm(selectedTerm);
  };

  useEffect(() => {
    props.updateTermSelection({
      year: null,
      term: null,
    });

    const fetchYears = async () => {
      try {
        const data = await courseApiWrapper.years();
        setYears(data.reverse());
      } catch (err) {
        console.error("Failed to fetch years:", err);
        setYears(null);
      }
    };

    fetchYears();
  }, []);

  useEffect(() => {
    props.updateTermSelection({
      year: null,
      term: null,
    });

    const fetchTerms = async () => {
      if (year === null || year === undefined) {
        setTerm(null);
        setTerms(undefined);

        return;
      }

      try {
        const data = await courseApiWrapper.terms(year);

        const orderMap: Record<Term, number> = {
          spring: 0,
          summer: 1,
          fall: 2,
        };
        const sortedTerms = data.sort((a, b) => orderMap[a] - orderMap[b]);

        setTerms(sortedTerms);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setTerms(null);
      }
    };

    fetchTerms();
  }, [year]);

  const yearStrings = useMemo(() => {
    return years ? years.map((year) => year.toString()) : years;
  }, [years]);

  const termStrings = useMemo(() => {
    return terms
      ? terms.map((term) => term.charAt(0).toUpperCase() + term.slice(1))
      : terms;
  }, [terms]);

  const yearPlaceholder = useMemo(() => {
    if (years === undefined) {
      return LOADING_TEXT;
    } else if (years === null) {
      return API_ERROR_TEXT;
    } else if (years.length === 0) {
      return NO_OFFERINGS_TEXT;
    } else {
      return `Select A Year (ex. ${years[0]})`;
    }
  }, [years]);

  const termPlaceholder = useMemo(() => {
    if (year === null) {
      return "Select A Year First";
    } else if (terms === undefined) {
      return LOADING_TEXT;
    } else if (terms === null) {
      return API_ERROR_TEXT;
    } else if (terms.length === 0) {
      return NO_OFFERINGS_TEXT;
    } else {
      const exampleTerm =
        terms[terms.length > 1 ? terms.length - 2 : terms.length - 1];
      return `Select A Term (ex. ${
        exampleTerm.charAt(0).toUpperCase() + exampleTerm.slice(1)
      })`;
    }
  }, [year, terms]);

  useEffect(() => {
    if (!year || !term) {
      return;
    }

    props.updateTermSelection({ year, term });
  }, [term]);

  return (
    <div className="flex flex-col space-y-8 lg:flex-row lg:flex-wrap lg:gap-8 lg:space-y-0">
      <div className="w-60">
        <TermSelectorCombobox
          label="Year"
          placeholder={yearPlaceholder}
          data={yearStrings}
          onOptionSubmit={onOptionSubmitYear}
        />
      </div>

      <div className="w-60">
        <TermSelectorCombobox
          label="Term"
          placeholder={termPlaceholder}
          data={termStrings}
          onOptionSubmit={onOptionSubmitTerm}
        />
      </div>
    </div>
  );
}
