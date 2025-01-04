"use client";

import { useEffect, useMemo, useState } from "react";
import courseApiWrapper, { Term } from "course-api-wrapper";
import CourseSelectorAutocomplete from "@components/CourseSelector/CourseSelectorAutocomplete";
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
  const [yearError, setYearError] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [years, setYears] = useState<number[] | null | undefined>(undefined);

  const [termError, setTermError] = useState<string | null>(null);
  const [term, setTerm] = useState<Term | null>(null);
  const [terms, setTerms] = useState<Term[] | null | undefined>(undefined);

  const onChangeYear = (value: number | null) => {
    if (year === value) {
      return;
    }

    if (years && value && years.includes(value)) {
      setYear(value);
      setTerms(undefined);
    } else {
      setYear(null);
    }
  };

  const onChangeTerm = (value: Term | null) => {
    if (term === value) {
      return;
    }

    if (terms && value && terms.includes(value)) {
      setTerm(value);
    } else {
      setTerm(null);
    }
  };

  useEffect(() => {
    props.updateTermSelection({
      year: null,
      term: null,
    });

    const fetchYears = async () => {
      try {
        const data = await courseApiWrapper.years();
        setYears(data);
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

        setTermError(null);

        return;
      }

      try {
        const data = await courseApiWrapper.terms(year);
        setTerms(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setTerms(null);
      }
    };

    fetchTerms();
  }, [year]);

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
      return `Select A Number (ex. ${terms[0]})`;
    }
  }, [year, terms]);

  useEffect(() => {
    if (!year || !term) {
      return;
    }

    props.updateTermSelection({ year, term });
  }, [term]);

  const getYearData = useMemo(() => {
    if (years) {
      return years.map((dataValue) => {
        return { value: dataValue, valueAsString: dataValue.toString() };
      });
    } else {
      return years;
    }
  }, [years]);

  const getTermData = useMemo(() => {
    if (terms) {
      return terms.map((dataValue) => {
        return { value: dataValue, valueAsString: dataValue };
      });
    } else {
      return terms;
    }
  }, [terms]);

  return (
    <div className="flex flex-col space-y-8 lg:flex-row lg:flex-wrap lg:gap-8 lg:space-y-0">
      <div className="w-60">
        <TermSelectorCombobox />
      </div>

      <div className="w-60">
        <TermSelectorCombobox />
      </div>
    </div>
  );
}
