port module Main exposing (Model, Msg(..), init, main, sounds, update, view)

-- import Random
-- import Canvas exposing (Shape, circle, fill, rect, shapes)
-- import Color
-- import Svg
-- import Svg.Attributes as SA

import Browser
import Browser.Dom exposing (getViewport)
import Browser.Events exposing (onAnimationFrame, onResize)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Random exposing (Generator, Seed, float)
import Task exposing (Task)



-- import Time exposing (Posix)
---- MODEL ----


port sounds : String -> Cmd msg


port soundComplete : (String -> msg) -> Sub msg


type alias Model =
    { playingSound : Bool
    , width : Float
    , height : Float
    }


init : ( Model, Cmd Msg )
init =
    ( { playingSound = False, width = 0, height = 0 }
    , Task.succeed (PlaySound "scream") |> Task.perform identity
    )



---- UPDATE ----


type Msg
    = PlaySound String
    | SoundComplete String
    | Resize Float Float
    | NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        PlaySound sound ->
            let
                command =
                    if model.playingSound then
                        Cmd.none

                    else
                        sounds "scream"
            in
            ( { model | playingSound = True }
            , command
            )

        SoundComplete sound ->
            ( { model | playingSound = False }, Cmd.none )

        Resize width height ->
            ( { model | width = width, height = height }, Cmd.none )

        NoOp ->
            ( model, Cmd.none )



---- VIEW ----


view : Model -> Html Msg
view { width, height } =
    div [ class "foreground" ]
        [ h1
            [ onClick (PlaySound "scream"), class "title" ]
            [ text "Metro Was A Mistake" ]
        ]


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ soundComplete SoundComplete
        , onResize (\w h -> Resize (toFloat w) (toFloat h))
        ]



---- PROGRAM ----


main : Program () Model Msg
main =
    Browser.element
        { view = view
        , init = \_ -> init
        , update = update
        , subscriptions = subscriptions
        }
