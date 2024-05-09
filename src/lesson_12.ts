interface IMovie {
  title: string;
  year: number;
  rating: string;
  rewards: string[];
}

interface IMovieCategory {
  name: string;
  movies: IMovie[];
}

type FilterValue = number | string | string[];

interface IMatchFilter<T> {
  filter: T;
}
interface IRangeFilter<T> {
  filter: T;
  filterTo: T;
}
interface IValueFilter<T> {
  values: T;
}

interface IFilterState {
  match?: IMatchFilter<FilterValue>;
  range?: IRangeFilter<FilterValue>;
  value?: IValueFilter<FilterValue>;
}

interface IList<T> {
  items: T[];
  applySearchValue: (value: string) => T[];
  applyFiltersValue: (value: FilterValue) => T[];
}

interface IMovieList extends IList<IMovie> {}
interface IMoviesCategoriesList extends IList<IMovieCategory> {}

class FilterService {
  protected filtersState: IFilterState = {};
  getFilterState(): IFilterState {
    return this.filtersState;
  }
  updateFilterState(filters: IFilterState) {
    this.filtersState = { ...this.filtersState, ...filters };
  }
  resetFilterState() {
    this.filtersState = {};
  }
  async postFilterState(filters: IFilterState): Promise<void> {
    try {
      await fetch("http://localhost:3000/api/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      });
    } catch (error) {
      if (error.message) {
        console.log(error.message);
      } else {
        console.log(error);
      }
    }
  }
}

class List<T> {
  private filterService: FilterService;
  protected items: T[];

  constructor(initialItems: T[]) {
    this.items = initialItems;
    this.filterService = new FilterService();
  }
  getItems(): T[] {
    return this.items;
  }
  //mocked methods
  applySearchValue(searchValue: string): T[] {
    this.filterService.updateFilterState({ match: { filter: searchValue } });
    console.log(`Applied search value filter: ${searchValue}`);
    return this.items;
  }
  applyFiltersValue(filters: IFilterState): T[] {
    this.filterService.updateFilterState(filters);
    console.log(
      `Applied filters value: ${JSON.stringify(
        this.filterService.getFilterState()
      )}`
    );
    return this.items;
  }
}

class MoviesList extends List<IMovie> {
  constructor(movies: IMovie[]) {
    super(movies);
  }
  getMoviesByYear(year: number): IMovie[] {
    return this.applyFiltersValue({ match: { filter: year } });
  }
  getMoviesByRating(rating: string): IMovie[] {
    return this.applyFiltersValue({ match: { filter: rating } });
  }
  getMoviesByRewards(rewards: string[]): IMovie[] {
    return this.applyFiltersValue({ match: { filter: rewards } });
  }
}

class MovieCategoriesList extends List<IMovieCategory> {
  constructor(categories: IMovieCategory[]) {
    super(categories);
  }
}
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Mock data
const movie1 = {
  title: "The Shawshank Redemption",
  year: 1994,
  rating: "9.3",
  rewards: ["Oscar"],
};
const movie2 = {
  title: "The Godfather",
  year: 1972,
  rating: "9.2",
  rewards: ["Oscar"],
};
const movie3 = {
  title: "The Dark Knight",
  year: 2008,
  rating: "9.0",
  rewards: [],
};
const movies = [movie1, movie2, movie3];

const category1 = {
  name: "Drama",
  movies: [movie1, movie2],
};
const category2 = {
  name: "Action",
  movies: [movie2, movie3],
};
const categories = [category1, category2];

const movieList = new MoviesList(movies);

console.log("All Movies:");
console.log(movieList.getItems());

console.log('Search for "Shawshank":');
const filteredMoviesBySearch = movieList.applySearchValue("Shawshank");

console.log("Filter by year after 1990 to 2000:");
const filteredMoviesByYear = movieList.applyFiltersValue({
  range: { filter: 1990, filterTo: 2000 },
});
console.log(filteredMoviesByYear);

console.log("Filter by movies with awards:");
const filteredMoviesByAwards = movieList.applyFiltersValue({
  value: { values: ["Oscar"] },
});
console.log(filteredMoviesByAwards);

const movieCategoryList = new MovieCategoriesList(categories);

console.log("All Categories:");
console.log(movieCategoryList.getItems());
