export interface IMovie {
  moviedb_id: number
  overview: string
  poster_path: string | null
  date: Date
  title: string
  on_my_library: boolean
}

export interface IMovieResult {
  movies: IMovie[]
}
